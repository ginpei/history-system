import { useSelector } from "react-redux";
import { Task } from "../../../../lib/task/Task";
import { TasksPageStoreState } from "../TasksPageHistory";

export function useTasks(): Task[] {
  return useSelector<TasksPageStoreState, Task[]>((v) => v.tasks.present.tasks);
}
