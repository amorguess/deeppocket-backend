const express = require('express');
const admin = require('firebase-admin');
const app = express();
app.use(express.json());

const privateKey = process.env.FIREBASE_PRIVATE_KEY
  ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
  : null;

if (privateKey) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: privateKey,
    })
  });
}

const db = admin.firestore ? admin.firestore() : null;
const THB_PER_EUR = 37.6;

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.get('/balance/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    if (!db) return res.json({ balance: 0 });
    const user = await db.collection('users').doc(userId).get();
    res.json({ balance: user.exists ? (user.data().balance || 0) : 0 });
  } catch (err) {
    console.error('Balance error:', err.message);
    res.json({ balance: 0, error: err.message });
  }
});

app.post('/webhook/sumup', async (req, res) => {
  try {
    const { status, checkout_reference } = req.body;
    if (status === 'PAID' && checkout_reference && db) {
      const checkoutRef = db.collection('checkouts').doc(checkout_reference);
      const checkout = await checkoutRef.get();
      if (checkout.exists && checkout.data().status === 'pending') {
        const { userId, thbAmount } = checkout.data();
        const userRef = db.collection('users').doc(userId);
        const user = await userRef.get();
        const currentBalance = user.exists ? (user.data().balance || 0) : 0;
        await userRef.set({ balance: currentBalance + thbAmount }, { merge: true });
        await checkoutRef.update({ status: 'paid' });
        console.log('Solde credite: +' + thbAmount + ' THB pour ' + userId);
      }
    }
    res.status(200).json({ received: true });
  } catch (err) {
    console.error('Webhook error:', err.message);
    res.status(200).json({ received: true });
  }
});

app.post('/debit', async (req, res) => {
  try {
    const { userId, amount } = req.body;
    if (!db) return res.status(500).json({ error: 'DB non disponible' });
    const userRef = db.collection('users').doc(userId);
    const user = await userRef.get();
    const currentBalance = user.exists ? (user.data().balance || 0) : 0;
    if (currentBalance < amount) return res.status(400).json({ error: 'Solde insuffisant' });
    await userRef.set({ balance: currentBalance - amount }, { merge: true });
    res.json({ newBalance: currentBalance - amount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => console.log('DeepPocket backend on port ' + PORT));
