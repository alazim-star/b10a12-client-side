import React from 'react';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import SectionTitle from '../Shard/SectionTitle';
import CheckOutFrom from './CheckOutFrom';

const stripePromise=loadStripe(import.meta.env.VITE_Payment_Gateway_PK)
const Payment = () => {


    return (
        <div>
            <SectionTitle heading='Payment' subHeading='---Please pay for eat---'></SectionTitle>
            
         

            <Elements stripe={stripePromise}>
               <CheckOutFrom></CheckOutFrom>
            </Elements>
        </div>
    );
};

export default Payment;