import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppStore } from "../../../redux/store";
import { ITask } from "../../../interfaces/task.interface";
import CardsContainer from "../../../components/CardsConainter/CardsContainer";
import "./dashboard.css";

const Dashboard = () => {
    const [todoTasks, setTodoTasks] = useState([]);
    const [inProgressTasks, setInProgressTasks] = useState([]);
    const [doneTasks, setDoneTasks] = useState([]);
    const accessToken = localStorage.getItem("accessToken");
    const user = useSelector((store: AppStore) => store.user);

    const fetchData = async () => {
        try {
            const { data } = await axios.get(
                `http://localhost:8000/api/users/${user.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            const { tasks } = data;
            const todoTasks = tasks.filter((task: ITask) => task.status === "CREATED");
            const inProgressTasks = tasks.filter(
                (task: ITask) => task.status === "IN_PROGRESS"
            );
            const doneTasks = tasks.filter((task: ITask) => task.status === "DONE");

            setTodoTasks(todoTasks);
            setInProgressTasks(inProgressTasks);
            setDoneTasks(doneTasks);
        } catch (error) {
            console.log(error);
        }
    }

    const getList = useCallback(() => {
        fetchData().catch(console.error);
    }, [])


    useEffect(() => {
        getList()
    }, [getList])

    return (
        <div className="wrap_container">
            <div className="dashboard">
                <CardsContainer
                    title={"TODO"}
                    tasks={todoTasks}
                    status="CREATED"
                    setTasks={setTodoTasks} // Pasar función para actualizar el estado local
                    onRefresh={getList}
                />
                <CardsContainer
                    title={"IN PROGRESS"}
                    tasks={inProgressTasks}
                    status="IN_PROGRESS"
                    setTasks={setInProgressTasks} // Pasar función para actualizar el estado local
                    onRefresh={getList}
                />
                <CardsContainer
                    title={"DONE"}
                    tasks={doneTasks}
                    status="DONE"
                    setTasks={setDoneTasks} // Pasar función para actualizar el estado local
                    onRefresh={getList}
                />
            </div>
        </div>
    );
};

export default Dashboard;
