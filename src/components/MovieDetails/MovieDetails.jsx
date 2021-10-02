import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function MovieDetails(){
    const dispatch = useDispatch();
    const movieDetails = useSelector(store => store.selectedMovieDetails);
    console.log(movieDetails)

    return(
        <div>
            <h1>Movie Details</h1>
                <img src={movieDetails[0].poster}></img>
                <h2>{movieDetails[0].title}</h2>
                <p>{movieDetails[0].description}</p>
                <h3>Genres</h3>
                {movieDetails.map((movie) => (
                    <h4>{movie.name}</h4>
                ))}
                <button onClick={() => dispatch({type: 'SET_POPUP_LOAD_FALSE'})}>Close</button>
        </div>
    )
}

export default MovieDetails;