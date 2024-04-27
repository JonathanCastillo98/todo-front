import React, { useState } from 'react';
import axios from 'axios';
import './modalCreateTask.css';
import { ISubTask } from '../../interfaces/subTask.interface';

type Props = {
    userId: string;
    status: string;
    onRefresh: () => void;
    setIsModalOpen: (value: boolean) => void;
}

const ModalCreateTask = ({ userId, status, onRefresh, setIsModalOpen }: Props) => {
    const [newSubTaskDescription, setNewSubTaskDescription] = useState<string>('');
    const [newSubTasks, setNewSubTasks] = useState<{ description: string, status: string }[]>([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: status,
        deadline: new Date()
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'subTasks_description_input') {
            setNewSubTaskDescription(value);
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const newTask = await axios.post(`http://localhost:8000/api/tasks/create/userOwner/${userId}`, formData);
            if (newSubTasks.length > 0) {
                const createSubTasksPromises = newSubTasks.map(async (subTask) => {
                    await axios.post(`http://localhost:8000/api/sub-tasks/create/taskOwner/${newTask.data.id}`, { description: subTask.description, status: subTask.status });
                })
                await Promise.all(createSubTasksPromises);
            }
            onRefresh();
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error al crear la tarea:', error);
        }
    };

    const handleAddSubTask = () => {
        if (newSubTaskDescription.trim() !== '') {
            setNewSubTasks([...newSubTasks, { description: newSubTaskDescription, status: "INCOMPLETED" }]);
            setNewSubTaskDescription(''); // Limpiar el campo de texto después de agregar la sub tarea
        }
    };

    return (
        <div className="modal-wrapper">
            <div className="modal-content">
                <h2>Create Task</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description (optional):</label>
                        <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="deadline">Deadline (optional):</label>
                        <input type="date" id="deadline" name="deadline" value={formData.deadline} onChange={handleChange} />
                    </div>

                    <label htmlFor="subTasks_description_input">Sub Task:</label>
                    <div className="subTasks_description">
                        <input type="text" id="subTasks_description_input" name="subTasks_description_input" value={newSubTaskDescription} onChange={handleChange} />
                        <button type="button" className="add-subtask-btn" onClick={handleAddSubTask}>Add</button>

                    </div>
                    {newSubTasks.length > 0 && <p>Sub Tasks:</p>}
                    {newSubTasks.map((subTask, index) => (
                        <ul key={index}>
                            <li>{subTask.description}</li>
                        </ul>
                    ))}

                    <div className='buttons'>
                        <button type="submit">Crear</button>
                        <button className='closeBtn' onClick={(e) => {
                            e.preventDefault();
                            setIsModalOpen(false);
                        }}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalCreateTask;
