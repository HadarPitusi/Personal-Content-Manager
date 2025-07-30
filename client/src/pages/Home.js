// Home.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkIfUserLogin, getCurrentUser } from '../utils/auth';
import Comments from '../items/Comments';
import '../css/Home.css';

const Home = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [showComments, setShowComments] = useState({});

    useEffect(() => {
        checkIfUserLogin(navigate, setUser);
    }, [navigate]);

    useEffect(() => {
        // Fetch all posts from the server
        fetch('http://localhost:8080/posts')
            .then(res => res.json())
            .then(data => setPosts(data));
    }, []);

    if (!user) return null;

    const toggleComments = (postId) => {
        setShowComments(prev => ({
            ...prev,
            [postId]: !prev[postId]
        }));
    };

    return (
        <div id="home_container">
            <h2 className='first_title'>Welcome, {user.user.name}!</h2>

            <hr />
            <button className='button_in_pannel' onClick={() => navigate(`/users/${user.user.id}/info`)}>Info</button>
            <button className='button_in_pannel' onClick={() => navigate(`/users/${user.user.id}/todos`)}>Todos</button>
            <button className='button_in_pannel' onClick={() => navigate(`/users/${user.user.id}/posts`)}>Posts</button>
            <button className='button_in_pannel' onClick={() => navigate(`/users/${user.user.id}/albums`)}>Albums</button>

            <br /><br />
            <button className='button_in_pannel' onClick={() => {
                localStorage.removeItem('currentUser');
                navigate('/login');
            }}>
                LogOut
            </button>

            <hr />
            <h3 className='second_title'>Community Posts</h3>
            {posts.map(post => (
                <div className='post_in_home' key={post.id} style={{ border: '1px solid gray', margin: '10px', padding: '10px' }}>
                    <h4 className='title_in_post'>{post.title}</h4>
                    <p className='body_in_post'>{post.body}</p>
                    <button className='comment_button_in_post' onClick={() => toggleComments(post.id)}>
                        {showComments[post.id] ? 'Hide Comments' : 'Show Comments'}
                    </button>

                    {showComments[post.id] && <Comments postId={post.id} />}
                </div>
            ))}
        </div>
    );
};

export default Home;
