//Todos.js
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkIfUserLogin, getCurrentUser } from '../utils/auth';
import TodoList from '../Lists/TodoList';
import '../css/Home.css';
import '../css/todos.css';

function Todos() {
    const navigate = useNavigate();
    const inputRef1 = useRef(null);
    const [user, setUser] = useState(null);
    const [todos, setTodos] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [filteredTodos, setFilteredTodos] = useState([]);
    const [sortBy, setSortBy] = useState('id');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchType, setSearchType] = useState('title');

    const currentUser = getCurrentUser();

    useEffect(() => {
        checkIfUserLogin(navigate, setUser);
    }, [navigate]);

    useEffect(() => {
        if (currentUser && currentUser.todos) {
            setTodos(currentUser.todos);
        }
    }, [user]);

    useEffect(() => {
        let updated = [...todos];

        if (searchQuery) {
            updated = updated.filter(todo => {
                if (searchType === 'id') return todo.id.toString().includes(searchQuery);
                if (searchType === 'title') return todo.title.toLowerCase().includes(searchQuery.toLowerCase());
                if (searchType === 'completed') return (
                    (searchQuery === 'true' && todo.completed) ||
                    (searchQuery === 'false' && !todo.completed)
                );
                return true;
            });
        }

        if (sortBy === 'id') {
            updated.sort((a, b) => a.id - b.id);
        } else if (sortBy === 'title') {
            updated.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortBy === 'completed') {
            updated.sort((a, b) => a.completed - b.completed);
        }

        setFilteredTodos(updated);
    }, [todos, sortBy, searchQuery, searchType]);

    function handleAdd() {
        setShowForm(true);
    }

    function handleCloseForm() {
        setShowForm(false);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const value1 = inputRef1.current.value.trim();

        if (value1) {
            handleCreateTodo(value1);
            inputRef1.current.value = '';
        }
    }

    function updateLocalStorage(updatedTodos) {
         const updatedUser = {
                ...currentUser,
                todos: updatedTodos,
            };
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }

    async function handleCreateTodo(title) {
        const newTodo = {
            userId: currentUser.user.id,
            title: title,
            completed: false
        };

        try {
            const response = await fetch('http://localhost:8080/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTodo),
            });

            if (!response.ok) {
                throw new Error('Failed to create todo');
            }

            const savedTodo = await response.json();
            const updatedTodos = [...todos, savedTodo];
            setTodos(updatedTodos);

          updateLocalStorage(updatedTodos);

            setShowForm(false);
        } catch (error) {
            console.error('Error creating todo:', error);
        }
    }


    const handleToggleComplete = async (id) => {
        const updatedTodos = todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(updatedTodos);

        const updated = updatedTodos.find((todo) => todo.id === id);

        try {
            await fetch(`http://localhost:8080/todos/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updated),
            });

           updateLocalStorage(updatedTodos);

        } catch (err) {
            console.error('Error updating todo:', err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:8080/todos/${id}`, {
                method: 'DELETE',
            });
            const updatedTodos = todos.filter((todo) => todo.id !== id);
            setTodos(updatedTodos);

        updateLocalStorage(updatedTodos);

        } catch (err) {
            console.error('Error deleting todo:', err);
        }
    };


    const handleEditTitle = async (id, newTitle) => {
        const updatedTodos = todos.map((todo) =>
            todo.id === id ? { ...todo, title: newTitle } : todo
        );
        setTodos(updatedTodos);

        const updated = updatedTodos.find((todo) => todo.id === id);

        try {
            await fetch(`http://localhost:8080/todos/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updated),
            });
            updateLocalStorage(updatedTodos);
        } catch (err) {
            console.error('Error editing title:', err);
        }
    };

    return (
        <>
            <p className='first_title'>Your todo list:</p>

            <div>
                <button className='button_in_pannel' onClick={handleAdd}>+ Add</button>
                <button className='button_in_pannel' onClick={() => navigate(`/users/${currentUser.user.id}/home`)}>← Back to Home</button>
            </div>

            <div style={{ marginTop: '10px' }}>
                <label className='second_title'>Sort by: </label>
                <select className='select_banner' value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="id">ID</option>
                    <option value="title">Title</option>
                    <option value="completed">Completed</option>
                </select>
            </div>

            <div>
                <label className='second_title'>Search by: </label>
                <select className='select_banner' value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                    <option value="id">ID</option>
                    <option value="title">Title</option>
                    <option value="completed">Completed</option>
                </select>
                <input
                    className='sreach_banner'
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <TodoList
                todos={filteredTodos}
                onToggle={handleToggleComplete}
                onDelete={handleDelete}
                onEdit={handleEditTitle}
            />

            {showForm && (
                <form onSubmit={handleSubmit} style={{ border: 'solid black 2px', width: '200px', height: '200px' }}>
                    <input ref={inputRef1} placeholder="title" />
                    <button type="submit">Create</button>
                    <button type="button" onClick={handleCloseForm}>Cancel</button>
                </form>
            )}
        </>
    );
}

export default Todos;
