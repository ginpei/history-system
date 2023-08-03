import { History, buildHistory } from "../history/History";
import { Task } from "./Task";

export interface TaskHistory extends History {
  tasks: Task[];
}

export function buildTaskHistory(title: string): TaskHistory {
  return {
    ...buildHistory(title),
    tasks: [],
  };
}
