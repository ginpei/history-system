import { State } from "../store/State";
import { Task } from "./Task";

export interface TaskState extends State {
  tasks: Task[];
}
