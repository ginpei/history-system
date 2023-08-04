import { StateWithHistory } from "redux-undo";
import { TasksPageState } from "./pageState/TasksPageState";
import { TasksState } from "./tasks/TasksState";

export interface TasksPageStoreState {
  pageState: TasksPageState;
  tasks: StateWithHistory<TasksState>;
}
