import React,{useState,useEffect} from 'react';
import { EventSeat } from '@material-ui/icons';
import { IconButton,Grid,Container,Typography,Button,Divider } from '@material-ui/core';
import {useParams,Link} from 'react-router-dom';
import './SeatArrangement.css';
import Axios from 'axios';

const SeatArrangement = ({selectedSeats,setSelectedSeats,price,setPrice,movie,setMovie}) => {
 
    const {id} = useParams(); 

    const loadMovies = () => {
        Axios.get(`http://localhost:8000/api/movies/${id}`)
            .then((data)=>{
                setMovie(data.data);
                console.log(data.data);
            })
            .catch((err)=>{
                console.log(err);
            });
    }
    



    const onClickSeat = (e,seat) =>{
        e.preventDefault();
        let el = document.getElementById(seat.seatNo);
        // console.log(seat);
        if(seat.isBooked !=="true"){
            if(selectedSeats.some(selseat =>{if(selseat.seatNo === seat.seatNo){return true} return false})){
                el.style.color ="lightgray";
                setSelectedSeats(prevSelectedState => (prevSelectedState.filter(s => s.seatNo !== seat.seatNo)));
            }else{
                el.style.color ="green";
                setSelectedSeats(selectedSeats=>[...selectedSeats,seat]);
            }
        }
    }


    const paintSelectedSeats = () => {
        selectedSeats.forEach((seat)=>{
            let el = document.getElementById(seat.seatNo);
            el.style.color="green";
        });
    }

    useEffect(()=>{
        loadMovies();
        paintSelectedSeats();
    },[]);


    useEffect(()=>{
        let sum=0;
        selectedSeats.forEach(seat => sum += seat.price);
        setPrice(sum);
        console.log(selectedSeats);
    },[selectedSeats]);

    return (

        <div className="seatArrangement">         
            <div className="seatArrangement-seatTitle">
                <Typography variant="h4" gutterBottom>Premium</Typography>
            </div>
            <Divider/>
            <div className="seatArrangement-container">
                <div className="seatArrangement-container-left" >
                    
                    <Grid container className="seatArrangement-grid" >
                    {
                        movie ?
                        movie.seats.seatsleft.map((seat,index)=>(
                            <Grid container justifyContent="center" alignItems="center" key={index}>
                            {
                            seat.map((seat1,index1)=>(
                                <Grid className="seat" item key={seat1.seatNo}>
                                    <IconButton id={seat1.seatNo} onClick={(e)=>onClickSeat(e,seat1)}  style={{color:seat1.isBooked === "true"?"red":"lightgray"}}  >
                                        <EventSeat />
                                    </IconButton>
                                </Grid>
                            ))
                            }
                            </Grid>
                            
                            
                            
                        )):null
                        
                    }
                    </Grid>
                </div>
                
                <div className="spacing" />

                <div className="seatArrangement-container-right" >
                    <Grid container >
                    {
                        movie?
                        movie.seats.seatsright.map((seat,index)=>(
                            <Grid container justifyContent="center" alignItems="center" key={index}>
                            {
                            seat.map((seat1,index1)=>(
                                <Grid className="seatLeft" item key={seat1.seatNo}>
                                    <IconButton id={seat1.seatNo} onClick={(e)=>onClickSeat(e,seat1)}  style={{color:seat1.isBooked === "true"?"red":"lightgray"}}  >
                                        <EventSeat  />
                                    </IconButton>
                                </Grid>
                            ))
                            }
                            </Grid>
                            
                            
                            
                        )):null
                    }
                    </Grid> 
                </div>
            </div>

            
            <div className="seatArrangement-seatTitle">
                <Typography variant="h4" gutterBottom>Normal</Typography>
            </div>
            <Divider/>
            <div className="seatArrangement-container">
                <div className="seatArrangement-container-left" >
                    
                    <Grid container className="seatArrangement-grid" >
                    {
                        movie?
                        movie.seats.belowseatsleft.map((seat,index)=>(
                            <Grid container justifyContent="center" alignItems="center" key={index}>
                            {
                            seat.map((seat1,index1)=>(
                                <Grid className="seatLeft" item key={seat1.seatNo}>
                                    <IconButton id={seat1.seatNo} onClick={(e)=>onClickSeat(e,seat1)}  style={{color:seat1.isBooked === "true"?"red":"lightgray"}}  >
                                        <EventSeat   />
                                    </IconButton>
                                </Grid>
                            ))
                            }
                            </Grid>
                            
                            
                            
                        )):null
                        
                    }
                    </Grid>
                </div>
                
                <div className="spacing" />

                <div className="seatArrangement-container-right" >
                    <Grid container >
                    {
                        movie?
                        movie.seats.belowseatsright.map((seat,index)=>(
                            <Grid container justifyContent="center" alignItems="center" key={index}>
                            {
                            seat.map((seat1,index1)=>(
                                <Grid className="seatLeft" item key={seat1.seatNo}>
                                    <IconButton id={seat1.seatNo} onClick={(e)=>onClickSeat(e,seat1)}  style={{color:seat1.isBooked === "true"?"red":"lightgray"}}  >
                                        <EventSeat   />
                                    </IconButton>
                                </Grid>
                            ))
                            }
                            </Grid>
                            
                            
                            
                        )):null
                    }
                    </Grid> 
                </div>
            </div>
            <div>

            </div>
            <div className="seatAraangement-buttondiv">
                <Button component={Link} to="/checkout" variant="contained" color="primary" size="large">
                    Pay: &#8377;{price}
                </Button>
            </div>
        </div>
    )
    
}

export default SeatArrangement
