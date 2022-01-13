import React from 'react';
import {Card,CardMedia,CardContent,CardActions,Typography,Button} from '@material-ui/core';
import { Link } from 'react-router-dom';
import './Movie.css'

const Movie = ({movie}) => {
    // const dt = new Date(movie.date);
    return (
        <div>
            <Card className='movie-card'>
                <CardMedia className='movie-card-media' image={movie.image}/>
                <CardContent className="movie-card-content">
                    <Typography variant="h6" style={{fontWeight:600,height:"70px"}}>
                        {movie.name}
                    </Typography>
                    <Typography variant="body2">
                        Date: {new Date(movie.date).toDateString()}
                    </Typography>
                    <Typography variant="body2">
                        Time: {movie.time}
                    </Typography>
                </CardContent>
                <CardActions style={{justifyContent:'center'}}>
                    <Button component={Link} to={`/book/${movie._id}`} variant="contained" type="button" color="primary" >Book </Button>
                </CardActions>
            </Card>
        </div>
    )
}

export default Movie
