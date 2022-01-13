import React,{useState,useEffect} from 'react';
import {BrowserRouter as Router , Routes, Route} from 'react-router-dom';
import './App.css';
import SeatArrangement from './components/SeatArrangement/SeatArrangement';
import Movies from './components/Movies/Movies';
import Navbar from './components/Navbar/Navbar';
import Payment from './components/Payment/Payment';
import SuccessMsg from './components/Payment/SuccessMsg/SuccessMsg';
import AddMovies from './components/Movies/AddMovies/AddMovies';



const App = () => {

    const [price,setPrice] = useState(0);
    const [movie,setMovie] = useState({});
    const [selectedSeats,setSelectedSeats] = useState([]);

    return(
        <Router>
            <Navbar />
            <Routes>
                <Route path="/home" element={<Movies
                                                setPrice={setPrice}
                                                setMovie={setMovie}
                                                setSelectedSeats={setSelectedSeats} 
                                            />} />
                <Route path="/book/:id" element={<SeatArrangement 
                                                    selectedSeats={selectedSeats} 
                                                    setSelectedSeats={setSelectedSeats} 
                                                    price={price}
                                                    setPrice={setPrice}
                                                    movie={movie}
                                                    setMovie={setMovie}
                                                />} />
                <Route path="/checkout" element={<Payment 
                                                    movie={movie} 
                                                    setMovie={setMovie} 
                                                    selectedSeats={selectedSeats} 
                                                    price={price} 
                                                />} />
                <Route path="/success" element={<SuccessMsg />} />
                <Route path="/addmovies" element={<AddMovies />} />
            </Routes>
        </Router>
    )
}

export default App;