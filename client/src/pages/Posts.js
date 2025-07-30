//Posts.js
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkIfUserLogin, getCurrentUser } from '../utils/auth'; 
import PostList from '../Lists/PostsList';
import '../css/posts.css';
import '../css/Home.css';

function Posts() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showForm, setShowForm] = useState(false);
    const titleRef = useRef(null);
    const bodyRef = useRef(null);

    const currentUser = getCurrentUser();

    useEffect(() => {
        checkIfUserLogin(navigate, setUser);
    }, [navigate]);

    useEffect(() => {
        if (currentUser?.posts) {
            setPosts(currentUser.posts);
        }
    }, [user]);

    useEffect(() => {
        let updated = [...posts];

        if (searchQuery) {
            updated = updated.filter(post =>
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.body.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }


        setFilteredPosts(updated);
    }, [posts, searchQuery]);

    function updateLocalStorage(updatedPosts) {
        const updatedUser = {
            ...currentUser,
            posts: updatedPosts,
        };
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }

    const handleAdd = () => {
        setShowForm(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const title = titleRef.current.value.trim();
        const body = bodyRef.current.value.trim();

        if (title && body) {
            const newPost = {
                userId: currentUser.user.id,
                title,
                body
            };

            fetch('http://localhost:8080/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newPost),
            })
                .then(res => res.json())
                .then(savedPost => {
                    const updatedPosts = [...posts, savedPost];
                    setPosts(updatedPosts);
                    updateLocalStorage(updatedPosts);
                    titleRef.current.value = '';
                    bodyRef.current.value = '';
                    setShowForm(false);
                });
        }
    };

    const handleDelete = (id) => {
        fetch(`http://localhost:8080/posts/${id}`, { method: 'DELETE' })
            .then(() => {
                const updated = posts.filter(p => p.id !== id);
                setPosts(updated);
                updateLocalStorage(updated);
            });
    };

    const handleEdit = (id, newTitle, newBody) => {
        const updatedPosts = posts.map(post =>
            post.id === id ? { ...post, title: newTitle, body: newBody } : post
        );
        setPosts(updatedPosts);

        fetch(`http://localhost:8080/posts/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedPosts.find(p => p.id === id)),
        }).then(() => updateLocalStorage(updatedPosts));
    };

    return (
        <>
            <h2 className='first_title'>Your Posts:</h2>

            <button className='button_in_pannel' onClick={handleAdd}>+ Add</button>
            <button className='button_in_pannel' onClick={() => navigate(`/users/${currentUser.user.id}/home`)}>← Back to Home</button>

            <div>
                <label className='second_title'>Search:</label>
                <input
                    className='sreach_banner'
                    type="text"
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <PostList posts={filteredPosts} onDelete={handleDelete} onEdit={handleEdit} />

            {showForm && (
                <form onSubmit={handleSubmit}>
                    <input ref={titleRef} placeholder="Post Title" />
                    <textarea className='textarea_in_add_form' ref={bodyRef} placeholder="Post Body" />
                    <button type="submit">Create</button>
                    <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
                </form>
            )}
        </>
    );
}

export default Posts;