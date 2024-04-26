import React, { useState } from 'react';

function TaskModal({ onClose, onAddTask }) {
  const [taskData, setTaskData] = useState({
    name: '',
    description: '',
    dueDate: '',
    priority: 'Low',
  });

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask(taskData);
  };

  return (

    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Add Task</h2>
        <form onSubmit={handleSubmit}>
          <label>Task Name:</label>
          <input type="text" name="name" value={taskData.name} onChange={handleChange} required />
          
          <label>Description:</label>
          <textarea name="description" value={taskData.description} onChange={handleChange}></textarea>
          
          <label>Due Date:</label>
          <input type="date" name="dueDate" value={taskData.dueDate} onChange={handleChange} />
          
          <label>Priority:</label>
          <select name="priority" value={taskData.priority} onChange={handleChange}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          
          <button type="submit">Add Task</button>
        </form>
      </div>
    </div>
  );
}

export default TaskModal;


