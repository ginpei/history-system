import { StateWithHistory } from "redux-undo";
import { AppHistory } from "../../../lib/history/AppHistory";
import { Task } from "../../../lib/task/Task";

export interface TasksPageStoreState {
  tasks: StateWithHistory<TasksStoreValue>;
}

export interface TasksStoreValue extends AppHistory {
  hideCompleted: boolean;
  tasks: Task[];
}
