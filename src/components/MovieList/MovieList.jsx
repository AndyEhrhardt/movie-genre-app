import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css'
import MovieDetails from '../MovieDetails/MovieDetails'

import {HashRouter as Router, Route} from 'react-router-dom';

//A pop up import that is able to display a component as a pop up with the page greyed out
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function MovieList() {

    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    //redux store updates popupLoad once it gets a result from the database
    const popupLoad = useSelector(store => store.setPopupLoad);

    //variables for opening and closing the pop up
    const [open, setOpen] = useState(false);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    //dispatches to sagas with movie id to get movie details from database
    const getSelectedMovieDetails = (event) => {
        console.log(event.target.value);
        dispatch({ type: 'GET_MOVIE_DETAILS', payload: event.target.value});
    }


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

                        
                            <button value={movie.id} onClick={(event) => getSelectedMovieDetails(event)}>View Details</button>
                            <Popup
                                open={popupLoad} 
                                modal
                                nested
                                position="top center"
                            >
                                <div>
                                <MovieDetails setOpen={setOpen}/>
                                
                                </div>
                            </Popup>
                        </>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;