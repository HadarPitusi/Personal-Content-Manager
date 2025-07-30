// Albums.js
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkIfUserLogin, getCurrentUser } from '../utils/auth';
import AlbumList from '../Lists/AlbumList';
import '../css/Home.css';
import '../css/albums.css';

function Albums() {
    const navigate = useNavigate();
    const inputRef = useRef(null);
    const [user, setUser] = useState(null);
    const [albums, setAlbums] = useState([]);
    const [filteredAlbums, setFilteredAlbums] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchType, setSearchType] = useState('title');

    const currentUser = getCurrentUser();

    useEffect(() => {
        checkIfUserLogin(navigate, setUser);
    }, [navigate]);

    useEffect(() => {
        if (currentUser && currentUser.albums) {
            setAlbums(currentUser.albums);
        }
    }, [user]);

    useEffect(() => {
        let updated = [...albums];

        if (searchQuery) {
            updated = updated.filter(album => {
                if (searchType === 'id') return album.id.toString().includes(searchQuery);
                if (searchType === 'title') return album.title.toLowerCase().includes(searchQuery.toLowerCase());
                return true;
            });
        }

        setFilteredAlbums(updated);
    }, [albums, searchQuery, searchType]);

    function handleAdd() {
        setShowForm(true);
    }

    function handleCloseForm() {
        setShowForm(false);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const value = inputRef.current.value.trim();

        if (value) {
            handleCreateAlbum(value);
            inputRef.current.value = '';
        }
    }

    function updateLocalStorage(updatedAlbums) {
        const updatedUser = {
            ...currentUser,
            albums: updatedAlbums,
        };
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }

    async function handleCreateAlbum(title) {
        const newAlbum = {
            userId: currentUser.user.id,
            title: title
        };

        try {
            const response = await fetch('http://localhost:8080/albums', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newAlbum),
            });

            if (!response.ok) throw new Error('Failed to create album');

            const savedAlbum = await response.json();
            const updatedAlbums = [...albums, savedAlbum];
            setAlbums(updatedAlbums);
            updateLocalStorage(updatedAlbums);
            setShowForm(false);
        } catch (err) {
            console.error('Error creating album:', err);
        }
    }

    return (
        <>
            <p className='first_title'>Your albums:</p>

            <div>
                <button className='button_in_pannel' onClick={handleAdd}>+ Add</button>
                <button className='button_in_pannel' onClick={() => navigate(`/users/${currentUser.user.id}/home`)}>← Back to Home</button>
            </div>

            <div>
                <label className='second_title'>Search by: </label>
                <select className='select_banner' value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                    <option value="id">ID</option>
                    <option value="title">Title</option>
                </select>
                <input
                    className='sreach_banner'
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <AlbumList albums={filteredAlbums} />

            {showForm && (
                <form onSubmit={handleSubmit} style={{ border: 'solid black 2px', width: '200px', height: '200px' }}>
                    <input ref={inputRef} placeholder="title" />
                    <button type="submit">Create</button>
                    <button type="button" onClick={handleCloseForm}>Cancel</button>
                </form>
            )}
        </>
    );
}

export default Albums;
