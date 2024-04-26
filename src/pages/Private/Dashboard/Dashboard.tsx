import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppStore } from "../../../redux/store";
import { ITask } from "../../../interfaces/task.interface";
import CardsContainer from "../../../components/CardsConainter/CardsContainer";
import "./dashboard.css";

const Dashboard = () => {
    const [todoTasks, setTodoTasks] = useState<ITask[]>([]);
    const [inProgressTasks, setInProgressTasks] = useState<ITask[]>([]);
    const [doneTasks, setDoneTasks] = useState<ITask[]>([]);
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
            const todoTasks: ITask[] = tasks.filter((task: ITask) => task.status === "TODO");
            const inProgressTasks: ITask[] = tasks.filter((task: ITask) => task.status === "IN_PROGRESS");
            const doneTasks: ITask[] = tasks.filter((task: ITask) => task.status === "DONE");

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
                    status="TODO"
                    onRefresh={getList}
                />
                <CardsContainer
                    title={"IN PROGRESS"}
                    tasks={inProgressTasks}
                    status="IN_PROGRESS"
                    onRefresh={getList}
                />
                <CardsContainer
                    title={"DONE"}
                    tasks={doneTasks}
                    status="DONE"
                    onRefresh={getList}
                />
            </div>
        </div>
    );
};

export default Dashboard;
