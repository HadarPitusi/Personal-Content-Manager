//TodoList.js
import React from 'react';
import NewTodo from '../items/NewTodo';
import '../css/todoList.css';

function TodoList({ todos, onToggle, onDelete, onEdit }) {
  if (todos.length === 0) {
    return <p>You have no todos yet.</p>;
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <NewTodo
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

export default TodoList;
