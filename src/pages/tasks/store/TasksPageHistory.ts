import { AppHistory, buildHistory } from "../../../lib/history/AppHistory";
import { Task } from "../../../lib/task/Task";

export interface TasksPageHistory extends AppHistory {
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
