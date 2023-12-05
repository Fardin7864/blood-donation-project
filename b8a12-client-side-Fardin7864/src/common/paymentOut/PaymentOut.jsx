// Import necessary components
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckOut from '../../pages/Payment/Chackout/ChackOut'

// Create a Stripe promise
const stripePromise = loadStripe("your_stripe_public_key");

// Wrap your component inside the Elements provider
const paymentOut = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckOut />
    </Elements>
  );
};

export default paymentOut;
