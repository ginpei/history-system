import { Task } from "./Task";

export interface TaskState {
  id: string;
  tasks: Task[];
  title: string;
}
