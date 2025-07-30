//Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { getCurrentUser, loginUser } from '../utils/auth'
import { useNavigate } from 'react-router-dom';

function Login({setCurrentUser}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res1 = await axios.get('http://localhost:8080/users');
            const users = res1.data;
            const user = users.find(u => u.username === username && u.website === password);

            const res2 = await axios.get('http://localhost:8080/posts');
            const allPosts = res2.data;
            const userPosts = allPosts.filter(p => p.userId == user.id);

            const res3 = await axios.get('http://localhost:8080/todos');
            const allTodos = res3.data;
            const userTodos = allTodos.filter(t => t.userId == user.id);

            const res4 = await axios.get('http://localhost:8080/albums');
            const allAlbums = res4.data;
            const userAlbums = allAlbums.filter(a => a.userId == user.id);

            //const res5 = await axios.get('http://localhost:8080/comments');
            //const allComments = res5.data;
            //const userComments = allComments.find(c => c.postId === userPosts.id);

            //const obj ={status : {numPost: allPosts.length , numTodo : allTodos.length, numAlbum : allAlbums.length }}
            //localStorage.setItem(JSON.stringify(obj))

            if (user) {
                loginUser(user,userPosts,userTodos,userAlbums);
                const curr = getCurrentUser()
                setCurrentUser(curr);
                navigate(`/users/${curr.user.id}/home`);

            } else {
                setError('Invalid username or password');
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred while logging in');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} required />
                <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <p>
                Don't have an account? {' '}
                <span
                    style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
                    onClick={() => navigate('/register')}
                >
                    Register
                </span>
            </p>
        </div>
    )
}

export default Login;