import { PayloadAction } from "@reduxjs/toolkit";
import { updateHistory } from "../../../lib/history/History";
import { Task } from "../../../lib/task/Task";
import { TasksPageHistory } from "./TasksPageHistory";
import { findTask } from "../../../lib/task/taskArrayManipulators";

export function add(state: TasksPageHistory, action: PayloadAction<Task>) {
  const task = action.payload;
  const title = `Added ${task.title}`;
  const tasks = [...state.tasks, task];
  return updateHistory(state, title, { tasks });
}

export function remove(
  state: TasksPageHistory,
  action: PayloadAction<Pick<Task, "id">>,
) {
  const task = findTask(state.tasks, action.payload.id);
  const title = `Removed ${task.title}`;
  const tasks = state.tasks.filter((v) => v.id !== action.payload.id);
  return updateHistory(state, title, { tasks });
}

export function update(state: TasksPageHistory, action: PayloadAction<Task>) {
  const task = action.payload;
  const title = `Updated ${task.title}`;
  const tasks = state.tasks.map((v) =>
    v.id === action.payload.id ? action.payload : v,
  );
  return updateHistory(state, title, { tasks });
}
