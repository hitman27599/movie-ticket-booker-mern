import React from 'react';
import { Typography,Button,Divider, } from '@material-ui/core';
import { Elements,CardElement,ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';



const BillPayment = ({onPrev,userDetails,bookTickets}) => {

    return (
        <div style={{ textAlign:"center",marginTop:"50px"}}>
            <Typography variant="h6" gutterBottom>
                Payment
            </Typography>
            <Typography variant="body2" gutterBottom>
                Not yet integrated
            </Typography>
            <div className="buttonsection">
                <Button onClick={()=>onPrev()} variant="outlined" color="secondary">Back</Button>
                <Button onClick={()=>bookTickets()} variant="contained" color="primary">Pay</Button>
            </div>
        </div>
        
    ) 
}

export default BillPayment
