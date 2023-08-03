import { History, buildHistory } from "../../../lib/history/History";
import { Task } from "../../../lib/task/Task";

export interface ReduxPageHistory extends History {
  tasks: Task[];
}

export function buildReduxPageHistory(title: string): ReduxPageHistory {
  return {
    ...buildHistory(title),
    tasks: [],
  };
}
