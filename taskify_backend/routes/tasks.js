import express from 'express';
const router = express.Router()

import db from '../middleware/database.js';
import authenticateUser from '../middleware/authenticateUser.js';

router.post('/', authenticateUser, async(req, res)=>{
    // Create a new task for the authenticated user using req.userId
    const userId = req.userId;
    const {taskName, taskDuration, dueDate, priority} = req.body
    const values = [userId, taskName, taskDuration, dueDate, priority]
    const query = 'INSERT INTO tasks(user_id,task_name,task_duration,due_date,priority) VALUES (?, ?, ?, ?, ?)'
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

    db.query('SELECT * FROM tasks WHERE user_id = ? AND completed = FALSE', userId, (err, results) => {
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
    const {taskName, taskDuration, dueDate, priority} = req.body
    const query = 'UPDATE tasks SET user_id = ?, task_name = ?, task_duration = ?, due_date = ?, priority = ? WHERE task_id = ?'
    const values = [userId, taskName, taskDuration, dueDate, priority, taskId]
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
        'DELETE FROM tasks WHERE task_id = ?', [taskId],(err,results)=>{
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Failed to delete task' });
            }
            return res.status(200).json({ message: 'Task deleted successfully' });
        }
    )
})


/* better understand the timer endpoints */

router.post('/:taskId/start', authenticateUser, async(req, res)=>{
    const taskId = req.params.taskId
    const startTime = new Date().toISOString().slice(0,19).replace('T', ' ')

    const query = 'UPDATE tasks SET start_time = ? WHERE task_id = ?'
    db.query(query, [startTime, taskId], (err, result)=>{
        if (err){
            console.error(err)
            return res.status(500).json({message: 'Failed to start timer'})
        }
        return res.status(200).json({message: 'Timer started successfully'})
    })
})

router.post('/:taskId/pause', authenticateUser, async(req, res)=>{
    const taskId = req.params.taskId

    const query = 'SELECT start_time, time_spent FROM tasks WHERE task_id = ?'
    db.query(query, [taskId], (err,results)=>{
        if (err){
            console.error(err);
            return res.status(500).json({ error: 'Failed to fetch task' });
        }
        const {start_time, time_spent} = results[0]
        const endTime = new Date().toISOString().slice(0,19).replace('T', ' ')
        const timeDiff = new Date(endTime) - new Date(start_time)
        const newTimeSpent = new Date(new Date('1970-01-01T' + time_spent + 'Z').getTime() +timeDiff).toISOString().slice(11,19)
        const updateQuery = 'UPDATE tasks SET time_spent = ?, start_time = NULL WHERE task_id = ?'
        db.query(updateQuery,[newTimeSpent, taskId], (err, result)=>{
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Failed to pause timer' });
              }
              return res.status(200).json({ message: 'Timer paused successfully' });
        })
    })
})


router.patch('/:taskId/complete', authenticateUser, async (req, res) => {
    const taskId = req.params.taskId;
    const query = 'UPDATE tasks SET completed = TRUE, time_spent = task_duration WHERE task_id = ?';
    db.query(query, [taskId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to mark task as completed' });
        }
        return res.status(200).json({ message: 'Task marked as completed' });
    });
});

router.get('/completed', authenticateUser, async (req, res) => {
    const userId = req.userId;
    db.query('SELECT * FROM tasks WHERE user_id = ? AND completed = TRUE', [userId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to fetch completed tasks' });
        }
        return res.status(200).json(results);
    });
});

export {router};