import { ISubTask } from "./subTask.interface";
import { IUser } from "./user.interface";

export interface ITask {
    id: string;
    title: string;
    description?: string | null;
    status: string;
    deadline?: string | null;
    user: IUser;
    subTasks: ISubTask[];
    createdAt: string;
    updatedAt: string;
  }