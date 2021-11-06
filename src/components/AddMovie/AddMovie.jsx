import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function AddMovie(){
    const dispatch = useDispatch();
    const history = useHistory();
    //Initial state is an OBJECT, with keys id and name
    let [newMovie, setNewMovie] = useState({
        title: "",
        description: "",
        poster: "",
        genre_id: "",
        
    });

    const handleNameChange = (event) => {
        console.log('event happened');
        console.log(event.target.value)
        switch (event.target.id) {
            case 'title':
                setNewMovie({ ...newMovie, title: event.target.value })
                break;
            case 'description':
                setNewMovie({ ...newMovie, description: event.target.value })
                break;
            case 'poster':
                setNewMovie({ ...newMovie, poster: event.target.value })
                break;        
        }
    }
    const handleSelect = (event) => {
        console.log(event.target.value)
        setNewMovie({ ...newMovie, genre_id: event.target.value })
    }

    const addNewMovie = event => {
        event.preventDefault();
        dispatch({ type: 'POST_MOVIE', payload: newMovie });
        setNewMovie({ 
            title: "",
            description: "",
            poster: "",
            genre_id: "",
         });
         history.push(`/`)
    }
    return (
        <div>
            <h3>Add Movie Form</h3>
            <button onClick={() => history.push(`/`)}>Movie List</button>
            <form onSubmit={addNewMovie}>
                <input id={"title"} placeholder="Title" type='text' value={newMovie.title} onChange={handleNameChange} />
                <input id={"description"} placeholder="Description" type='text' value={newMovie.description} onChange={handleNameChange} />
                <input id={"poster"} placeholder="Link to Image" type='text' value={newMovie.poster} onChange={handleNameChange} />
                <label for="genre">Genre</label>
                <select 
                    onChange={handleSelect}
                >
                    <option value={1}>Adventure</option>
                    <option value={2}>Animated</option>
                    <option value={3}>Biographical</option>
                    <option value={4}>Comedy</option>
                    <option value={5}>Disaster</option>
                    <option value={6}>Drama</option>
                    <option value={7}>Epic</option>
                    <option value={8}>Fantasy</option>
                    <option value={9}>Musical</option>
                    <option value={10}>Romantic</option>
                    <option value={11}>Science Fiction</option>
                    <option value={12}>Space-Opera</option>
                    <option value={13}>Superhero</option>
                </select>                
                <input type='submit' value='Add New Movie' />

            </form>
        </div>
    )
}

export default AddMovie;