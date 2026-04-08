const express = require('express');
const admin = require('firebase-admin');
const app = express();
app.use(express.json());

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  projectId: 'lumiia-ef405'
});

const db = admin.firestore();
const THB_PER_EUR = 37.6;

app.post('/create-checkout', async (req, res) => {
  const { userId, eurAmount } = req.body;
  if (!userId || !eurAmount) return res.status(400).json({ error: 'Paramètres manquants' });

  const thbAmount = Math.round(eurAmount * THB_PER_EUR);
  const checkoutId = 'dp_' + Date.now() + '_' + userId;

  await db.collection('checkouts').doc(checkoutId).set({
    userId,
    eurAmount,
    thbAmount,
    status: 'pending',
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  });

  res.json({
    checkoutId,
    thbAmount,
    paymentUrl: `https://pay.sumup.com/b2c/QPIX4CVQ?ref=${checkoutId}`
  });
});

app.post('/webhook/sumup', async (req, res) => {
  const { id, status, checkout_reference } = req.body;
  console.log('Webhook SumUp recu:', req.body);

  if (status === 'PAID' && checkout_reference) {
    const checkoutRef = db.collection('checkouts').doc(checkout_reference);
    const checkout = await checkoutRef.get();

    if (checkout.exists && checkout.data().status === 'pending') {
      const { userId, thbAmount } = checkout.data();
      const userRef = db.collection('users').doc(userId);
      const user = await userRef.get();

      const currentBalance = user.exists ? (user.data().balance || 0) : 0;
      const newBalance = currentBalance + thbAmount;

      await userRef.set({ balance: newBalance }, { merge: true });
      await checkoutRef.update({ status: 'paid' });

      console.log(`Solde mis a jour: user=${userId} +${thbAmount} THB = ${newBalance} THB`);
    }
  }

  res.status(200).json({ received: true });
});

app.get('/balance/:userId', async (req, res) => {
  const { userId } = req.params;
  const user = await db.collection('users').doc(userId).get();
  const balance = user.exists ? (user.data().balance || 0) : 0;
  res.json({ balance });
});

app.post('/debit', async (req, res) => {
  const { userId, amount } = req.body;
  const userRef = db.collection('users').doc(userId);
  const user = await userRef.get();
  const currentBalance = user.exists ? (user.data().balance || 0) : 0;

  if (currentBalance < amount) {
    return res.status(400).json({ error: 'Solde insuffisant' });
  }

  await userRef.set({ balance: currentBalance - amount }, { merge: true });
  res.json({ newBalance: currentBalance - amount });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`DeepPocket backend running on port ${PORT}`));
