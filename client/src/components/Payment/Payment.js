import React,{useState} from 'react';
import {Stepper,Step,StepLabel,Paper,Divider,Button,CssBaseline} from '@material-ui/core';
import UserDetails from './UserDetails/UserDetails';
import './Payment.css';
import Bill from './Bill/Bill';
import BillPayment from './BillPayment/BillPayment';
import Axios from 'axios';
import {useNavigate} from 'react-router-dom';

const steps=['ticket Details','User Details','payment'];


const Payment = ({movie,setMovie,selectedSeats,price}) => {

    const navigate = useNavigate();

    const [userDetails,setUserDetails] = useState({});
    const onNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    const onPrev = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }

    const next = (data) => {
        setUserDetails(data);
        onNext();
    }

    const bookTickets = () =>{
        for(let side in movie.seats){
            movie.seats[side].forEach((row)=>{
                row.forEach((seat)=>{
                    if(selectedSeats.includes(seat)){
                        seat.isBooked="true";
                        console.log(seat.seatNo);
                    }
                })
            })
        }
        setMovie(movie);
        Axios.put(`http://localhost:8000/api/movies/${movie._id}`,{
            seats: movie.seats,
        })
            .then((data)=>{
                console.log(data);
                navigate('/success');
            })
            .catch((err)=>{
                console.log(err);
            });
        
    }

    const Form = () => activeStep === 0
        ? <Bill movie={movie} selectedSeats={selectedSeats} price={price} onPrev={onPrev} onNext={onNext} />
        : <UserDetails next={next} onPrev={onPrev} />

    const Confirmation = () =><BillPayment onPrev={onPrev} userDetails={userDetails} bookTickets={bookTickets} />

    const [activeStep,setActiveStep] = useState(0);
    console.log(selectedSeats);
    return (
        <>
        <CssBaseline/>
        <div className="payment">
            <Paper className="paper" elevation={3}>
                <Stepper activeStep={activeStep}>
                    {steps.map((step)=>(
                        <Step key={step}>
                            <StepLabel>{step}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <Divider />
                {activeStep === steps.length -1 ? <Confirmation /> : <Form />}
            </Paper>
        </div>
        </>
    )
}

export default Payment
