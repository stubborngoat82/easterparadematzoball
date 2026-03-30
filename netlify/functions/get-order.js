// Retrieves a completed Stripe Checkout session so the confirmation page
// can display order details to the customer.

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  const sessionId = event.queryStringParameters?.session_id;
  if (!sessionId) {
    return { statusCode: 400, body: 'Missing session_id' };
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items'],
    });

    const meta = session.metadata || {};
    let items = [];
    try { items = JSON.parse(meta.items || '[]'); } catch {}

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name:          meta.customer_name || '',
        email:         session.customer_email || '',
        items,
        delivery:      meta.delivery || 'pickup',
        total:         session.amount_total ? `$${(session.amount_total / 100).toFixed(2)}` : '',
        paymentStatus: session.payment_status,
      }),
    };
  } catch (err) {
    return { statusCode: 500, body: err.message };
  }
};
