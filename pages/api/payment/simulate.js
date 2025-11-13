export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).end();
  // Accepts {reservationId, method} and returns a simulated payment result
  const { reservationId, method='card' } = req.body;
  // In production integrate Stripe/PayPal here.
  res.json({ok:true, reservationId, status:'paid', chargedAt: new Date().toISOString()});
}
