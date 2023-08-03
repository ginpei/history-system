import { History, buildHistory } from "../../../lib/history/History";
import { Task } from "../../../lib/task/Task";

export interface TasksPageHistory extends History {
  hideCompleted: boolean;
  tasks: Task[];
}

export function buildTasksPageHistory(title: string): TasksPageHistory {
  return {
    ...buildHistory(title),
    hideCompleted: false,
    tasks: [],
  };
}
