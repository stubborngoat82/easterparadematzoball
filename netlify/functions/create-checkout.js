// ─────────────────────────────────────────────────────────────────────────────
// EASTER PARADE MATZO BALL — Stripe Checkout Session Creator
//
// TO USE:
//   1. Set environment variable STRIPE_SECRET_KEY in Netlify dashboard
//      (or in a local .env file for testing with `netlify dev`)
//      Test key starts with sk_test_...
//      Live key starts with sk_live_...
//
//   2. Test locally:
//      npm install        (installs stripe package)
//      netlify dev        (starts local server at localhost:8888)
//
// ─────────────────────────────────────────────────────────────────────────────

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Stripe Price IDs — map each size to its Price ID from the Stripe dashboard
const PRICE_IDS = {
  S:    'price_1TGlLHEPNaqEvCxlaB15AIRg',  // $25 — S, M, L, XL
  M:    'price_1TGlLHEPNaqEvCxlaB15AIRg',
  L:    'price_1TGlLHEPNaqEvCxlaB15AIRg',
  XL:   'price_1TGlLHEPNaqEvCxlaB15AIRg',
  XXL:  'price_1TGlLpEPNaqEvCxlUw5p93xU',  // $30 — XXL, XXXL
  XXXL: 'price_1TGlLpEPNaqEvCxlUw5p93xU',
};

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  const { cart, delivery, contact } = body;

  // Basic validation
  if (!cart || cart.length === 0) {
    return { statusCode: 400, body: 'Cart is empty' };
  }
  if (!contact?.email || !contact?.name) {
    return { statusCode: 400, body: 'Name and email are required' };
  }

  // Build Stripe line items using Price IDs
  const lineItems = cart.map(item => {
    const priceId = PRICE_IDS[item.size];
    if (!priceId) throw new Error(`Invalid size: ${item.size}`);
    return {
      price: priceId,
      quantity: item.qty,
    };
  });

  // Shipping line item — uses price_data since shipping is calculated dynamically
  if (delivery === 'shipping') {
    const totalShirts = cart.reduce((sum, item) => sum + item.qty, 0);
    const shippingCents = totalShirts > 0
      ? Math.round((10 + (totalShirts - 1) * 2.5) * 100)
      : 0;
    if (shippingCents > 0) {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Shipping',
            description: '$10 first shirt + $2.50 each additional',
          },
          unit_amount: shippingCents,
        },
        quantity: 1,
      });
    }
  }

  // Store order details in session metadata so the webhook can record them
  const metadata = {
    customer_name: contact.name,
    phone: contact.phone || '',
    delivery: delivery,
    items: JSON.stringify(cart),  // e.g. [{"color":"White","size":"M","qty":1,"price":25}]
  };
  if (delivery === 'shipping') {
    metadata.ship_address = contact.address || '';
    metadata.ship_city    = contact.city    || '';
    metadata.ship_zip     = contact.zip     || '';
  }

  // Determine the base URL — works locally (netlify dev) and in production
  const baseUrl = process.env.URL || 'http://localhost:8888';

  let session;
  try {
    session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      customer_email: contact.email,
      success_url: `${baseUrl}/tshirts.html?order=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${baseUrl}/tshirts.html`,
      metadata,
    });
  } catch (err) {
    console.error('Stripe error:', err.message);
    return { statusCode: 500, body: `Stripe error: ${err.message}` };
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: session.url }),
  };
};
