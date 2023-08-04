import { useSelector } from "react-redux";
import { TasksPageStateValue, TasksPageStoreState } from "../TasksPageHistory";

export function useHideCompleted(): TasksPageStateValue["hideCompleted"] {
  return useSelector((v: TasksPageStoreState) => v.pageState.hideCompleted);
}
