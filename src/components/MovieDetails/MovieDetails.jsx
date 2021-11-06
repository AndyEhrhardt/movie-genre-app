import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { useParams } from 'react-router-dom'

function MovieDetails(){
    const [selectedMovie, setSelectedMovie] = useState({})
    //gets the id of the selected movie from url
    const {id} = useParams();
    const history = useHistory();
    //gets genres for selected movie
    const movieDetails = useSelector(store => store.selectedMovieDetails);
    //gets list of movies
    const allMovies = useSelector(store => store.movies);
    const dispatch = useDispatch();

    useEffect(() => {
        getMovieInfo();
    }, []);

    const getMovieInfo =() => {
        console.warn(id)
        dispatch({ type: 'FETCH_MOVIES' });
        dispatch({ type: 'GET_MOVIE_DETAILS', payload: id})
        whichMovie()
    }

    

    const whichMovie = () => {
        allMovies.map((movie) => {
            if(`${movie.id}`===id){
                return setSelectedMovie(movie)
            }
        })
    }
    console.log(selectedMovie)

    const handleBack = (event) =>{
        event.preventDefault();
        history.push("/")
    }
    
    return(
        <div>
            <h1>Movie Details</h1>
                <img src={movieDetails[0].poster}></img>
                <h2>{movieDetails[0].title}</h2>
                <p>{movieDetails[0].description}</p>
                <h3>Genres</h3>
                {movieDetails.map((movie) => (
                    <h4 key={movie.name}>{movie.name}</h4>
                ))}
                <button onClick={(event) => handleBack(event)}>Close</button>
        </div>
    )
}

export default MovieDetails;