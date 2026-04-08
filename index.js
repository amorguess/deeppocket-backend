const express = require('express');
const admin = require('firebase-admin');
const app = express();
app.use(express.json());

try {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
  console.log('Firebase OK');
} catch(e) {
  console.error('Firebase init error:', e.message);
}

const getDb = () => { try { return admin.firestore(); } catch(e) { return null; } };

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.get('/balance/:userId', async (req, res) => {
  try {
    const db = getDb();
    if (!db) return res.json({ balance: 0 });
    const user = await db.collection('users').doc(req.params.userId).get();
    res.json({ balance: user.exists ? (user.data().balance || 0) : 0 });
  } catch (err) {
    res.json({ balance: 0, error: err.message });
  }
});

app.post('/webhook/sumup', async (req, res) => {
  try {
    const { status, checkout_reference } = req.body;
    const db = getDb();
    if (status === 'PAID' && checkout_reference && db) {
      const checkoutRef = db.collection('checkouts').doc(checkout_reference);
      const checkout = await checkoutRef.get();
      if (checkout.exists && checkout.data().status === 'pending') {
        const { userId, thbAmount } = checkout.data();
        const userRef = db.collection('users').doc(userId);
        const user = await userRef.get();
        const current = user.exists ? (user.data().balance || 0) : 0;
        await userRef.set({ balance: current + thbAmount }, { merge: true });
        await checkoutRef.update({ status: 'paid' });
        console.log('Credite +' + thbAmount + ' THB -> ' + userId);
      }
    }
    res.json({ received: true });
  } catch (err) {
    res.json({ received: true, error: err.message });
  }
});

app.post('/debit', async (req, res) => {
  try {
    const { userId, amount } = req.body;
    const db = getDb();
    if (!db) return res.status(500).json({ error: 'DB non disponible' });
    const userRef = db.collection('users').doc(userId);
    const user = await userRef.get();
    const current = user.exists ? (user.data().balance || 0) : 0;
    if (current < amount) return res.status(400).json({ error: 'Solde insuffisant' });
    await userRef.set({ balance: current - amount }, { merge: true });
    res.json({ newBalance: current - amount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => console.log('DeepPocket on port ' + PORT));