import { useSelector } from "react-redux";
import { TasksPageStoreState } from "../TasksPageStoreState";
import { TasksPageState } from "./TasksPageState";

export function useHideCompleted(): TasksPageState["hideCompleted"] {
  return useSelector((v: TasksPageStoreState) => v.pageState.hideCompleted);
}
