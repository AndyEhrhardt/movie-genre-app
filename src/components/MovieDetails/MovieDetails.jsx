import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function MovieDetails(){
    const dispatch = useDispatch();
    const movieDetails = useSelector(store => store.selectedMovieDetails);
    console.log(movieDetails)
    
    return(
        <>
            <h1>Movie Details</h1>
            {/* 
            {movieDetails ? (
                <h2>{movies[0].title}</h2>
                <p>{movies[0].title}</p>
            ): ("didn't load I guess")
            }
                */}
        </>
    )
}

export default MovieDetails;