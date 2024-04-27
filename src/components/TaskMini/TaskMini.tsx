import './taskMini.css'
import { LuGoal } from 'react-icons/lu';
import { MdDone } from 'react-icons/md';
import { ISubTask } from '../../interfaces/subTask.interface';
import React, { useState } from 'react';
import axios from 'axios';
type Task = {
    title: string,
    description?: string | null
    status: string,
    deadline?: string | null,
    id: string,
    subTasks: ISubTask[],
    createdAt: string,
    updatedAt: string
}
type Props = {
    task: Task,
    onRefresh: () => void
}

const TaskMini = ({ task, onRefresh }: Props) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const onDeleteTask = async (e: React.MouseEvent<HTMLSpanElement>) => {
        try {
            e.stopPropagation();
            if (task.subTasks.length > 0) {
                const deleteSubTasksPromises = task.subTasks.map(async (subTask) => {
                    await axios.delete(`http://localhost:8000/api/sub-tasks/delete/${subTask.id}`);
                });
                await Promise.all(deleteSubTasksPromises);
            }
            await axios.delete(`http://localhost:8000/api/tasks/delete/${task.id}`);
            onRefresh();
        } catch (error) {
            console.error(error);
        }
    }
    const startDrag = (e: React.DragEvent<HTMLDivElement>, item: Task) => {
        e.dataTransfer.setData('itemID', item.id);

    }

    return (
        <div className="task-mini" draggable onDragStart={(e) => startDrag(e, task)} onClick={() => setIsEditModalOpen(true)}>
            <div className="task-mini_title">{task.title}</div>
            <div className="task-mini_description">{task.description}</div>
            <footer className='task-mini_footer'>
                <span onClick={onDeleteTask} className='task-mini_footer_delete-btn'>delete</span>
                {
                    task.subTasks.length > 0 && (
                        <div className="task-mini_footer_sub-tasks-status">
                            <MdDone />
                            <span>[{task.subTasks.filter(subTask => subTask.status === "COMLETED").length}/{task.subTasks.length}]</span>
                        </div>
                    )
                }

                {
                    task.deadline && (
                        <div className="task-mini_footer_deadline">
                            <LuGoal />
                            <p>{task.deadline}</p>
                        </div>
                    )
                }
            </footer>
        </div>

    )
}
export default TaskMini