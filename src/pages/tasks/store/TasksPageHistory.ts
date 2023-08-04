import { StateWithHistory } from "redux-undo";
import { AppHistory } from "../../../lib/history/AppHistory";
import { Task } from "../../../lib/task/Task";

export interface TasksPageStoreState {
  pageState: TasksPageStateValue;
  tasks: StateWithHistory<TasksStoreValue>;
}

export interface TasksPageStateValue {
  hideCompleted: boolean;
}

export interface TasksStoreValue extends AppHistory {
  tasks: Task[];
}
