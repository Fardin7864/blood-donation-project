import {loadStripe} from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js"
import ChackOut from "./Chackout/ChackOut";


const stripePromise = loadStripe(import.meta.env.VITE_Pyment_key);

const Payment = () => {
    console.log(stripePromise)
    return (
        <div>
            <div>
                <Elements stripe={stripePromise}>
                    <ChackOut></ChackOut>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;