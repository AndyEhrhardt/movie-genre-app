import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css'
import MovieDetails from '../MovieDetails/MovieDetails'

import {HashRouter as Router, Route} from 'react-router-dom';

import { useHistory } from 'react-router-dom';

function MovieList() {

    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);
    const pageLoad = useSelector(store => store.setPageLoad);

    //used for navigating to the movie details page
    const history = useHistory();

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    const getSelectedMovieDetails = (event) => {
        console.log(event.target.value)
        dispatch({ type: 'GET_MOVIE_DETAILS', payload: event.target.value});
        checkLoad();
    }
    
    const checkLoad = () => { //checks if movie details have loaded every 100ms
        if(pageLoad === false) {
           window.setTimeout(checkLoad, 100); 
        } else {
            history.push('/moviedetails')
        }
    }

    return (
        <main>
            <h1>MovieList</h1>
            <section className="movies">
            <Router>        

                {movies.map(movie => {
                    return (
                        <>
                            <div key={movie.id} >
                                <h3>{movie.title}</h3>
                                <img src={movie.poster} alt={movie.title}/>
                            </div>

                            
                            
                            <button value={movie.id} onClick={(event) => getSelectedMovieDetails(event)}>View Details</button>
                            
                        </>
                    );
                })}
            </Router>
            </section>
        </main>

    );
}

export default MovieList;