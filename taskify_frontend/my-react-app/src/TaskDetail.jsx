import React, { useEffect, useState } from 'react';
import './css/taskdetail.css'
import del from './assets/delete.svg'
import play from './assets/play.svg'
import pause from './assets/pause.svg'
import api from './utils/api';

import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import RadialSeparators from "./RadialSeparators";


function ProgressBar({percentage}){

    return (
        <>
            <div style={{ width: 200, height: 200 }}>
                <CircularProgressbarWithChildren value={percentage} text={`${percentage}%`} strokeWidth={10} styles={buildStyles({strokeLinecap: "butt", height:"40px",  pathColor: `rgba(224, 159, 5, ${percentage / 10})`,textColor:'#1e488f', backgroundColor:"#e6e7ee",trailColor: '#d6d6d6'})}>
                    <RadialSeparators
                    count={12}
                    style={{
                        background: "#fff",
                        width: "1.5px",
                        // This needs to be equal to props.strokeWidth
                        height: `${10}%`
                    }}
                    />
                </CircularProgressbarWithChildren>
                {/* <p>{console.log(calculateProgress(task.task_duration, task.task_duration))}</p> */}
            </div>
            
      </>
    )
}

function TaskDetail({ task, onDelete, onUpdate, onComplete, onFetchTask }) {

    function timeStringToSeconds(timeString) {
        const [hours, minutes, seconds] = timeString.split(':').map(Number);
        return hours * 3600 + minutes * 60 + seconds;
      }

      function calculateProgress(timeSpent, taskDuration) {
        const timeSpentInSeconds = timeStringToSeconds(timeSpent);
        const taskDurationInSeconds = timeStringToSeconds(taskDuration);
      
        if (taskDurationInSeconds === 0) {
          return 0; // Avoid division by zero
        }
      
        const progress = (timeSpentInSeconds / taskDurationInSeconds) * 100;
        return progress.toFixed(2); // Return progress as a percentage with 2 decimal places
      }

    const [percentage, setPercentage] = useState(0)

    useEffect(()=>setPercentage(calculateProgress(task.time_spent, task.task_duration)),[percentage])
    

    async function handlePlay(id){
        try {
            const response = await api.post(`/tasks/${id}/start`)
            if (response.status === 200){
                alert("Timer started successfully")
            }
            else{
                console.error('Failed to start timer');
            }
        } catch (error) {
            console.error('Error starting timer:', error);
        }
        
    }

    async function handlePause(id){
        try {
            const response = await api.post(`/tasks/${id}/pause`)
            if (response.status === 200){
                alert("Timer paused successfully")
                onFetchTask('/tasks')
            }
            else{
                console.error('Failed to pause timer');
            }
        } catch (error) {
            console.error('Error pausing timer:', error);
        }
    }


  return (
    // <div >
        // <div className='task-row'>
            <div className="task-detail">
                <div className='h2-wrapper'>
                    <h2>{task.task_name}</h2>
                    <img src={del} onClick={()=>onDelete(task.task_id)} style={{height:"20px", width:"20px"}}/>
                </div>
                
                {/* <p>Status: {task.task_progress}</p> */}
                {/* <div className='task-detail-flex-parent'> */}
                    <div className='task-detail-flex-group'>
                        <ProgressBar percentage={percentage}/>
                        <div className='explanatory-text'>
                            <p>Duration: {task.task_duration}</p>
                            <p>Due Date: {new Date(task.due_date).toLocaleDateString()}</p>
                            <p>Priority: {task.priority}</p>
                            <p>Created At: {new Date(task.created_at).toLocaleDateString()}</p>
                            
                        </div>
                        <button onClick={() => onComplete(task.task_id)}>Mark as Completed</button>
                        
                        
                    </div>
                {/* </div> */}
                <div className='play-pause' style={{display:"flex", gap:"20px", justifyContent:"center"}}>
                    <div>
                        {task.time_spent}
                    </div>
                    <span><img src={play} style={{height:"20px", width:"20px"}} onClick={()=>handlePlay(task.task_id)}/></span>
                    <span><img src={pause} style={{height:"20px", width:"20px"}} onClick={()=>handlePause(task.task_id)}/></span>
                </div>
            </div>
        // </div>
    // </div>
    
  );
}

export default TaskDetail;
