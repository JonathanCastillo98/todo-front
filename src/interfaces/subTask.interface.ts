import { ITask } from "./task.interface";

export interface ISubTask {
    id: string;
    description: string;
    status: string;
    user: ITask;
    createdAt: string;
    updatedAt: string;
}