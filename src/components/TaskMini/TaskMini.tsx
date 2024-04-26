import './taskMini.css'
import { LuGoal } from 'react-icons/lu';
import { MdDone } from 'react-icons/md';
import { ISubTask } from '../../interfaces/subTask.interface';
import React from 'react';
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
    task: Task
}

const TaskMini = ({ task }: Props) => {
    const startDrag = (e: React.DragEvent<HTMLDivElement>, item: Task) => {
        e.dataTransfer.setData('itemID', item.id);

    }

    return (
        <div className="task-mini" draggable onDragStart={(e) => startDrag(e, task)}>
            <div className="task-mini_title">{task.title}</div>
            <div className="task-mini_description">{task.description}</div>
            <footer className='task-mini_footer'>
                <span className='task-mini_footer_delete-btn'>delete</span>
                {
                    task.subTasks.length > 0 && (
                        <div className="task-mini_footer_sub-tasks-status">
                            <MdDone />
                            <span>[{task.subTasks.filter(subTask => subTask.status === "COMspanLETED").length}/{task.subTasks.length}]</span>
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