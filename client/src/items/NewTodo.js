// NewTodo.js
import React, { useState } from 'react';
import '../css/todo.css';

function NewTodo({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const handleSave = () => {
    if (editedTitle.trim() !== '') {
      onEdit(todo.id, editedTitle.trim());
      setIsEditing(false);
    }
  };

  return (
    <div className="todo_item">
      <h5>ID: {todo.id}</h5>

      {isEditing ? (
        <>
          <input
            type="text"
            className="todo_input"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <button className="todo_button save" onClick={handleSave}>Save</button>
          <button className="todo_button cancel" onClick={() => {
            setIsEditing(false);
            setEditedTitle(todo.title);
          }}>Cancel</button>
        </>
      ) : (
        <>
          <p className="todo_title">{todo.title}</p>
          <label className="todo_checkbox">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
            />
            Completed
          </label>
          <button className="todo_button edit" onClick={() => setIsEditing(true)}>Edit</button>
          <button className="todo_button delete" onClick={() => onDelete(todo.id)}>X</button>
        </>
      )}
    </div>
  );
}

export default NewTodo;
