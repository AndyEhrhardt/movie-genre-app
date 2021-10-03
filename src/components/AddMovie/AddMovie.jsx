import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

function AddMovie(){
    const dispatch = useDispatch();

    //Initial state is an OBJECT, with keys id and name
    let [newMovie, setNewMovie] = useState({
        name: "",
        image_path: "",
        clade: "",
        order: "",
        family: "",
        subfamily: "",
        genus: ""
    });

    const handleNameChange = (event) => {
        console.log('event happened');
        switch (event.target.id) {
            case 'name':
                setNewMovie({ ...newMovie, name: event.target.value })
                break;
            case 'description':
                setNewMovie({ ...newMovie, decription: event.target.value })
                break;
            case 'image_path':
                setNewMovie({ ...newMovie, image_path: event.target.value })
                break;
            case 'genre':
                setNewMovie({ ...newMovie, genre: event.target.value })
                break;
            
        }
    }

    const addNewMovie = event => {
        event.preventDefault();
        dispatch({ type: 'POST_PLANT', payload: newMovie });
        setNewMovie({ 
            name: "",
            description: "",
            image_path: "",
            genre: "",
         });
    }
    return (
        <div>
            <h3>This is the form</h3>
            <pre>{JSON.stringify(newMovie)}</pre>
            <form onSubmit={addNewMovie}>
                <input id={"name"} placeholder="name" type='text' value={newPlant.name} onChange={handleNameChange} />
                <input id={"description"} placeholder="kingdom" type='text' value={newPlant.kingdom} onChange={handleNameChange} />
                <input id={"image_path"} placeholder="clade" type='text' value={newPlant.clade} onChange={handleNameChange} />
                <input id={"genre"} placeholder="order" type='text' value={newPlant.order} onChange={handleNameChange} />
                <input type='submit' value='Add New Plant' />
            </form>
        </div>
    )
}

export default AddMovie;