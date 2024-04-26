import Navbar from "./Navbar"
import TaskModal from "./TaskModal"
import { useState } from "react"

function Tasks(){
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleAddTask = (taskData) => {
        console.log(`Task Data: ${taskData}`);
        setIsModalOpen(false);
    }


    return (
        <>
            <Navbar></Navbar>  
            <h1>Tasks Page</h1>
            <button>Add Task</button>
            {isModalOpen &&(
                <TaskModal onClose={toggleModal} onAddTask={handleAddTask}></TaskModal>
            )}
        </>
    )
}

export default Tasks