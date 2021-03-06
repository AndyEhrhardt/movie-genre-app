import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';


const defaultDetails = [{
    description: "loading",
    id: "",
    poster: "loading",
    title: "loading",
    name: "loading",
}]




// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('GET_MOVIE_DETAILS', getSelectedMovieDetails);
    yield takeEvery('POST_MOVIE', postNewMovie);
}


//{}{}{}{}{}{}  DELETED THIS FROM THE PUT IN FUNCTION BELOW payload: movieDetails.data
function* postNewMovie(action) {
    console.log('in post movie details')
    try {
        console.log(action.payload)
        yield axios.post(`/api/movie/`, action.payload);
        yield put({type: "FETCH_MOVIES"});
    } catch {
        console.log("error posting movie");
    }
}




//sends get request for specific movie's details
function* getSelectedMovieDetails(action) {
    try {
        console.log(action.payload)
        const movieId = action.payload
        const movieDetails = yield axios.get(`/api/movie/${movieId}`);
        console.log(movieDetails.data)
        yield put({type: "SET_MOVIE_DETAILS", payload: movieDetails.data});
    } catch {
        console.log("error getting selected movie details");
    }
}

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });
    } catch {
        console.log('get all error');
    }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

//Used to store the details for the selected movie
const selectedMovieDetails = (state = defaultDetails, action) => {
    switch (action.type) {
        case 'SET_MOVIE_DETAILS':
            return action.payload;
        default:
            return state;
    }
}



// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        selectedMovieDetails
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);




// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
