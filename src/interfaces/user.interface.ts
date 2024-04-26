import { ITask } from "./task.interface";

export interface IUser {
  id: string;
  firstname: string;
  lastname: string;
  age: number;
  email: string;
  username: string;
  role: string;
  tasks: ITask[];
}
