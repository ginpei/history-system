import { AppHistory } from "../../../../lib/history/AppHistory";
import { Task } from "../../../../lib/task/Task";

export interface TasksState extends AppHistory {
  tasks: Task[];
}
