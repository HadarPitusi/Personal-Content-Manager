//NewAlbum.js
import '../css/photo.css';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';


function NewPhoto({id, title, url , onDelete, onUpdate , thumbnailUrl,albumid}) {
    const [showForm, setShowForm] = useState(false);
    const [showUpdate, setshowUpdate] = useState(false);

    const inputRef1 = useRef();
    const inputRef2 = useRef();
    const inputRef3 = useRef();

    function handleCloseForm() {
        setShowForm(false);
    }

    function handleCloseUpdateForm() {
        setshowUpdate(false);
    }

    function handleDelete (){
        fetch(`http://localhost:8080/photos/${id}`, {
            method: 'DELETE',
        })
        .then((res) => {
            if (res.ok) {
                onDelete(id); 
            } else {
                console.error('Failed to delete photo');
            }
        })
        .catch((err) => console.error(err));
        setShowForm(false);
    }

    function handleShowUptade (){
        setshowUpdate(true);
    }
    function handleUptade (){
        setshowUpdate(false);
        setShowForm(false);

        const newTitle = inputRef3.current.value.trim();
        const newUrl = inputRef1.current.value.trim();
        const newThumb = inputRef2.current.value.trim();

        if (!newTitle || !newUrl || !newThumb) return;

        const updatedPhoto = {
            //id,
            albumId: albumid, 
            title: newTitle,
            url: newUrl,
            thumbnailUrl: newThumb
        };

        fetch(`http://localhost:8080/photos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedPhoto),
        })
        .then((res) => res.json())
        .then((data) => {
            onUpdate(data); 
            setshowUpdate(false);
            setShowForm(false);
        })
        .catch((err) => console.error(err));
    }

    return (
        <>
            <div className="photo">
                <img src={url} alt={title} className="photo-img" onClick={()=>setShowForm(true)}/>
                {showForm&&<form style={{ border: 'solid black 2px', width: '200px', height: '200px' }}>
                              <button type="button" className="sec_form_but" onClick={()=>handleShowUptade()}>Uptade</button>
                              <button type="button" className="sec_form_but" onClick={()=>handleDelete()}>Delete</button>
                              <button type="button" className="sec_form_but" onClick={()=>handleCloseForm()}>Cancel</button>
                </form>}

                {showUpdate&&<form style={{ border: 'solid black 2px', width: '200px', height: '200px' }}>
                            <input ref={inputRef3} placeholder="title" defaultValue={title} />
                            <input ref={inputRef1} placeholder="photo url" defaultValue={url} />
                            <input ref={inputRef2} placeholder="alturnet url" defaultValue={thumbnailUrl} />
                            <button type="button" onClick={()=>handleUptade()}>Update</button>
                            <button type="button" onClick={()=>handleCloseUpdateForm()}>Cancel</button>
                </form>}
            </div>
        </>
    );
}

export default NewPhoto;