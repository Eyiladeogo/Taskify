import express from 'express';
const router = express.Router()

import db from '../middleware/database.js';
import authenticateUser from '../middleware/authenticateUser.js';

router.post('/', authenticateUser, async(req, res)=>{
    // Create a new task for the authenticated user using req.userId
    const userId = req.userId;
    const {taskName, taskProgress, taskDescription, dueDate, priority} = req.body
    const values = [userId, taskName, taskProgress, taskDescription, dueDate,priority]
    const query = 'INSERT INTO tasks(user_id,task_name,task_progress,task_description,due_date,priority) VALUES (?, ?, ?, ?, ?, ?)'
    db.query(query, values,(err, result) =>{
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to create task' });
        }
        return res.status(201).json({ message: 'Task created successfully', taskId: result.insertId });
    });
});

router.get('/', authenticateUser, async(req, res) => {
    // Retrieve tasks for the authenticated user using req.userId
    const userId = req.userId

    db.query('SELECT * FROM tasks WHERE user_id = ?', userId, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to fetch tasks' });
        }
        return res.status(200).json(results);
    });
});

router.put('/:taskId', authenticateUser, async(req, res)=>{
    // Update an existing task for the authenticated user using req.userId
    const taskId = req.params.taskId;
    const userId = req.userId;
    const {taskName, taskProgress, taskDescription, dueDate, priority} = req.body
    const query = 'UPDATE tasks SET user_id = ?, task_name = ?, task_description = ?, task_progress = ?, due_date = ?, priority = ? WHERE taskId = ?'
    const values = [userId, taskName, taskDescription, taskProgress, dueDate, priority, taskId]
    db.query(
        query, values, (err, result)=>{
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Failed to update task' });
            }
            return res.status(200).json({ message: 'Task updated successfully' });
        });
});

router.delete('/:taskId', authenticateUser, async(req,res)=>{
    // Delete an existing task for the authenticated user using req.userId
    const taskId = req.params.taskId;
    db.query(
        'DELETE FROM tasks WHERE taskId = ?', [taskId],(err,results)=>{
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Failed to delete task' });
            }
            return res.status(200).json({ message: 'Task deleted successfully' });
        }
    )
})

export {router};