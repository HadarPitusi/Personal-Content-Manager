import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getCurrentUser } from '../utils/auth';
import { useLocation } from 'react-router-dom';
import PhotoList from '../Lists/PhotoList';
import { useRef } from 'react';
import '../css/addform.css';
import '../css/photos.css';

function Photos() {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [numPhotos, setnumPhotos] = useState(0);

  const location = useLocation();
  const albumid = location.state?.id;
  const user = getCurrentUser();
  const inputRef1 = useRef();
  const inputRef2 = useRef();
  const inputRef3 = useRef();


  useEffect(() => {
    setPhotosfunc();
  }, []);

  function handleAdd() {
    setShowForm(true);
  }

  function handleCloseForm() {
    setShowForm(false);
  }

  const setPhotosfunc = async () => {
    const res = await axios.get('http://localhost:8080/photos');
    const allPhotos = res.data;
    const userPhotos = allPhotos.filter(p => p.albumId == albumid);
    setnumPhotos(allPhotos.length);
    setPhotos(userPhotos);
    console.log(userPhotos);
  };

  function handleSubmit(e) {
    e.preventDefault();
    const value1 = inputRef1.current.value.trim();
    const value2 = inputRef2.current.value.trim();
    const value3 = inputRef3.current.value.trim();

    if (value3 && value1 && value2) {
      handleCreatePhoto(value3, value1, value2);
      inputRef1.current.value = '';
    }
  }

  function handleDeletePhoto(id) {
    fetch(`http://localhost:8080/photos/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        setPhotos(prev => prev.filter(p => p.id !== id));
        console.log(`Photo ${id} deleted`);
      })
      .catch((error) => {
        console.error('Failed to delete photo:', error);
      });
  }

  function handleCreatePhoto(title, url, thumbnailUrl) {
    setnumPhotos(numPhotos + 1);
    const newPhoto = {
      "albumId": albumid,
      "id": String(numPhotos),
      "title": title,
      "url": url,
      "thumbnailUrl": thumbnailUrl
    };

    setPhotos(prev => [...prev, newPhoto]);
    setShowForm(false);

    //send http reqest to the server to add to the db the new album 
    fetch('http://localhost:8080/photos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPhoto),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    //uptade LS - dont need becuase photo doesnt save in LS 

  }

  return (
    <>
      <p className='first_title'>your photos in album {albumid}:</p>
      <button className='button_in_pannel_ph' onClick={handleAdd}>+</button>
      <button className='button_in_pannel_ph' onClick={() => navigate(`/users/${user.user.id}/albums`)}>Back to albums</button>
      <button className='button_in_pannel_ph' onClick={() => navigate(`/users/${user.user.id}/home`)}>← Back to Home</button>
      <PhotoList photos={photos}
        onDelete={handleDeletePhoto}
        onUpdate={(updatedPhoto) => setPhotos(prev => prev.map(p => p.id == updatedPhoto.id ? updatedPhoto : p))} />
      {showForm && <form onSubmit={handleSubmit} style={{ border: 'solid black 2px', width: '200px', height: '200px' }}>
        <input ref={inputRef3} placeholder="title" />
        <input ref={inputRef1} placeholder="photo url" />
        <input ref={inputRef2} placeholder="alturnet url" />
        <button type="submit">Create</button>
        <button type="button" onClick={() => handleCloseForm()}>Cancel</button>
      </form>}
    </>
  )
}

export default Photos;
