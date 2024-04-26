import { ITask } from "./task.interface";

export interface IUser {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  tasks: ITask[];
}
