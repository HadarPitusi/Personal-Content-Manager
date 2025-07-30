//Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== verifyPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            const res = await fetch('http://localhost:8080/users');
            const users = await res.json();

            const userExists = users.find((u) => u.username === username);
            if (userExists) {
                setError('Username already exists');
                return;
            }

            const newUser = { username, website: password };
            localStorage.setItem('newUserDraft', JSON.stringify(newUser));//שמירה כזמני עד שנסיים את הרישום בעמוד הבא
            navigate('/register/details');
        } catch (err) {
            console.error(err);
            setError('An error occurred while registering');
        }
    }

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input type="text"
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required />
                <input type="password"
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required />
                <input type="password"
                    placeholder='Verify Password'
                    value={verifyPassword}
                    onChange={(e) => setVerifyPassword(e.target.value)}
                    required />
                <button type="submit">Continue to registration</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    )
}
export default Register;