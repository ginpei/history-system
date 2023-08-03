import { History } from "../history/History";
import { Task } from "./Task";

export interface TaskHistory extends History {
  tasks: Task[];
}
