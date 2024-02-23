import React, { useState, useEffect } from 'react';
import './App.css';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleTaskInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      setNewTask('');
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  return (
    <div className="container">
      <h1>Todo List</h1>
      <input
        type="text"
        placeholder="Enter task"
        value={newTask}
        onChange={handleTaskInputChange}
        className="task-input"
      />
      <button onClick={handleAddTask} className="add-button">
        Add Task
      </button>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className="task-item">
            <span className="task-text">{task}</span>
            <button onClick={() => handleDeleteTask(index)} className="delete-button">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
