import React,{useState,useEffect} from 'react';
import Movie from './Movie/Movie';
import {Grid,TextField,Button,Typography} from '@material-ui/core';
import './Movies.css';
import Axios from 'axios';

const Movies = ({setPrice,setMovie,setSelectedSeats}) => {

    const [movies,setMovies] = useState([]);
    const [search,setSearch] = useState('');

    const searchChange = (e) => {
        setSearch(e.target.value);
    }

    const onClickSearch = () => {
        Axios.post("http://localhost:8000/api/movies/search",{name:search})
            .then((data)=>{
                console.log(data);
                if(data.data){
                    let data1 = data.data;
                    console.log(data1);
                    if(!Array.isArray(data1)){
                        data1=[data1];
                    }
                    setMovies(data1);
                }else{
                    setMovies([]);
                }
            })
            .catch((err)=>{
                console.log(err);
            });
    }

    useEffect(()=>{
        loadMovies();
        setPrice(0);
        setMovie();
        setSelectedSeats([]);
    },[])

    const loadMovies = () => {
        Axios.get("http://localhost:8000/api/movies")
            .then((data)=>{
                console.log(data.data);
                setMovies(data.data);
            })
            .catch((err)=>{
                console.log(err);
            });
    }
    
    return (
        <div className="movies-contaiiner">
            <div className="searchbar">
                {/* <TextField fullWidth size="medium" placeholder="Search movie" style={{border:"1px solid black"}} /> */}
                <input type="text" value={search} onChange={(e)=>searchChange(e)} placeholder="Search movie" size="50" style={{marginRight:"20px" }}/>
                <Button onClick={()=>onClickSearch()} variant="contained" color="primary" >search</Button>
            </div>
            <Grid container spacing={5} >
                {
                    movies.length !== 0 ? movies.map((movie,index)=>(
                        <Grid item key={index} >
                            <Movie movie={movie} />
                        </Grid>
                    ))
                    :   <div style={{textAlign:"center",margin:"auto"}}>
                        <Typography variant="h6" color="secondary">Not Found</Typography>
                        </div>
                }
            </Grid>
            
        </div>
    )
}

export default Movies
