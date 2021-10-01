import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css'
import MovieDetails from '../MovieDetails/MovieDetails'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import {HashRouter as Router, Route} from 'react-router-dom';

function MovieList() {

    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    return (
        <main>
            <h1>MovieList</h1>
            <section className="movies">
                {movies.map(movie => {
                    return (
                        <>
                        <div key={movie.id} >
                            <h3>{movie.title}</h3>
                            <img src={movie.poster} alt={movie.title}/>
                        </div>

                        <Route path="/moviedetails" >
                            <MovieDetails />
                        </Route>
                        <Popup
                            trigger={<button className="button"> Open Modal </button>}
                            modal
                            nested
                        >
                            <MovieDetails />
                        </Popup>
                        </>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;