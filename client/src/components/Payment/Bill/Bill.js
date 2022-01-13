import React from 'react';
import {Typography,Card,CardMedia,CardContent,Divider,Button} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import './Bill.css';



const Bill = ({movie,selectedSeats,price,onPrev,onNext}) => {

    const navigate = useNavigate();

    console.log(movie);
    return (
        <div>
            <div className="bill">
                <Card className="card">
                    <CardMedia className="cardmedia" image={movie.image}>

                    </CardMedia>
                    <CardContent className="cardcontent">
                        <Typography variant="h6" style={{fontWeight:600,height:"70px"}}>
                            {movie.name}
                        </Typography>
                        <Typography variant="body2" >
                            {new Date(movie.date).toDateString()},{movie.time}
                        </Typography>
                        {/* <Divider/> */}
                        <Typography className="seatnumber" variant="h6" >
                            Seats :
                            {
                                selectedSeats.map((seat)=>(
                                    <span key={seat.seatNo}> {seat.seatNo},</span>
                                ))
                            }
                        </Typography>
                        <Typography className="total" variant="h6" >
                            Total: &#8377;{price}
                        </Typography>
                    </CardContent>
                </Card>
            </div>
            <div className="buttonsection">
                    <Button onClick={()=>navigate(-1)} className="nextButton" variant="outlined" color="secondary" >Back</Button>
                    <Button onClick={()=>onNext()} className="nextButton" variant="contained" color="primary" >Next</Button>
            </div>
        </div>
        
    )
}

export default Bill
