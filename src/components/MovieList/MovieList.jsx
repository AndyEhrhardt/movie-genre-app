import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css'
import MovieDetails from '../MovieDetails/MovieDetails'

import {HashRouter as Router, Route} from 'react-router-dom';

import { useHistory } from 'react-router-dom';




function MovieList() {

    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);
    const movieDetails = useSelector(store => store.selectedMovieDetails);

    //used for navigating to the movie details page
    const history = useHistory();

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
        dispatch({ type: 'GET_MOVIE_DETAILS', payload: 1}); //selects any movie to have some information in the reducer
    }, []); //otherwise movie detail page will load 1/2 a second before any information is in the reducer and fail to load

    //dispatches to sagas with movie id to get movie details from database
    const getSelectedMovieDetails = (movie) => {
        console.log(movie);
        //dispatch({ type: 'GET_MOVIE_DETAILS', payload: movie.id})
        console.log(movieDetails)
        history.push(`/moviedetails/${movie.id}`)
    }
    

    return (
        <main>
            <h1>MovieList</h1>
            <button onClick={() => history.push(`/addmovie`)}>Add Movie</button>
            <section className="movies">
                {movies.map(movie => {
                    return (
                            <div key={movie.id} >
                                <h3>{movie.title}</h3>
                                <img 
                                onClick={() => getSelectedMovieDetails(movie)}
                                src={movie.poster} 
                                alt={movie.title}/>
                            </div>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;