import React, { useState, useEffect,useContext } from "react";
import {loadStripe} from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useHistory
} from "react-router-dom";
import axios from 'axios';
import {AuthContext} from "../../contexts/Contexts";
const backendUrl = process.env.REACT_APP_BACKEND_URL.toString();
const frontendUrl = process.env.REACT_APP_FRONTEND_URL.toString();
const stripePublicKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY.toString();
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// This is your test public API key.
const stripePromise = loadStripe(stripePublicKey);

export const CheckoutForm = () => {

  const [clientSecret, setClientSecret] = useState('');
  const { authToken} = useContext(AuthContext);
 useEffect(() => {
  // const token = localStorage.getItem('token');

  axios.post(backendUrl + "/create-checkout-session", {}, {
    headers: {
      'Authorization': `Token ${authToken}`,
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    setClientSecret(response.data.clientSecret);
  })
  .catch(error => console.error('Error:', error));
}, [authToken]);
  // useEffect(() => {
  // }, [clientSecret]);
  return (
    <div id="checkout">

      {clientSecret && (
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{clientSecret}}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
    </div>
  )

}

export const Return = () => {

    const history = useHistory();
    const [status, setStatus] = useState(null);
    const [customerEmail, setCustomerEmail] = useState('');

    useEffect(() => {
        console.log("Return called")
        debugger
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const sessionId = urlParams.get('session_id');

        fetch(backendUrl + `/session-status?session_id=${sessionId}`)
            .then((res) => res.json())
            .then((data) => {
                setStatus(data.status);
                setCustomerEmail(data.customer_email);
            });
    }, []);

    if (status === 'open') {

        console.log("Test checkout redirect")
        history.push("/checkout")
    }

    if (status === 'complete') {

        history.push("/successmessage")

    }

    return null;
}


export const SuccessMessage = () => {


 return (
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent to you.

          If you have any questions, please email <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
      </section>
    )
}
