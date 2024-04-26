import axios from "axios";
import TaskMini from "../TaskMini/TaskMini";
import "./cardsContainer.css";
import { ITask } from "../../interfaces/task.interface";
import React from "react";

type Props = {
    title: string;
    tasks: ITask[];
    status: string;
    onRefresh: () => void;
}

const CardsContainer = ({ title, tasks, status, onRefresh }: Props) => {

    const accessToken = localStorage.getItem("accessToken");
    const draggingOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };
    const onDrop = async (e: React.DragEvent<HTMLDivElement>) => {
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
            onRefresh();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div
            className="cards-container"
            onDragOver={(e) => draggingOver(e)}
            onDrop={onDrop}
        >
            <div className="cards-header">{title}</div>
            <div className="tasks">
                {tasks.map((task) => (
                    <TaskMini key={task.id} task={task} />
                ))}
            </div>
            <button className="add-task-btn">+ Add task</button>
        </div>
    );
};

export default CardsContainer;
