import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function MovieDetails(){
    const dispatch = useDispatch();
    const movieDetails = useSelector(store => store.selectedMovieDetails);
    console.log(movieDetails)
    
    return(
        <>
            <h1>Movie Details</h1>
           
           
                <h2>{movieDetails[0].title}</h2>
                <p>{movieDetails[0].title}</p>
                
               
        </>
    )
}

export default MovieDetails;