
import SectionTitle from '../Shard/SectionTitle';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckOutForm from './CheckOutForm';

const stripePromise=loadStripe(import.meta.env.VITE_Payment_Gateway_PK)
const Payment = () => {


    return (
        <div>
            <SectionTitle heading='Payment'></SectionTitle>
            
         

            <Elements stripe={stripePromise}>
            <CheckOutForm></CheckOutForm>
            </Elements>
        </div>
    );
};

export default Payment;