import axios from "axios";
import { useEffect, useState } from "react";
import TaskMini from "../TaskMini/TaskMini";
import "./cardsContainer.css";

const CardsContainer = ({ title, tasks, status, onRefresh }) => {
    const accessToken = localStorage.getItem("accessToken");
    const [localTasks, setLocalTasks] = useState(tasks);

    useEffect(() => {
        setLocalTasks(tasks);
    }, [tasks]);

    const draggingOver = (e) => {
        e.preventDefault();
    };

    const onDrop = async (e) => {
        e.preventDefault();
        const taskId = e.dataTransfer.getData("itemID");
        try {
            await axios.put(
                `http://localhost:8000/api/tasks/edit/${taskId}`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            // Actualizar el estado local después de la acción de arrastrar y soltar
            const updatedTasks = localTasks.map((task) =>
                task.id === taskId ? { ...task, status } : task
            );
            setLocalTasks(updatedTasks);
            onRefresh();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div
            className="cards-container"
            droppable="true"
            onDragOver={(e) => draggingOver(e)}
            onDrop={onDrop}
        >
            <div className="cards-header">{title}</div>
            <div className="tasks">
                {localTasks.map((task) => (
                    <TaskMini key={task.id} task={task} />
                ))}
            </div>
            <button className="add-task-btn">+ Add task</button>
        </div>
    );
};

export default CardsContainer;
