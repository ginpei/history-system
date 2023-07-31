import { PayloadAction } from "@reduxjs/toolkit";
import { updateState } from "../../../lib/store/State";
import { Task } from "../../../lib/task/Task";
import { TaskState } from "../../../lib/task/TaskState";
import { findTask } from "../../../lib/task/taskArrayManipulators";

export function add(state: TaskState, action: PayloadAction<Task>) {
  const task = action.payload;
  const title = `Added ${task.title}`;
  const tasks = [...state.tasks, task];
  return updateState(state, title, { tasks });
}

export function remove(
  state: TaskState,
  action: PayloadAction<Pick<Task, "id">>,
) {
  const task = findTask(state.tasks, action.payload.id);
  const title = `Removed ${task.title}`;
  const tasks = state.tasks.filter((v) => v.id !== action.payload.id);
  return updateState(state, title, { tasks });
}

export function update(state: TaskState, action: PayloadAction<Task>) {
  const task = action.payload;
  const title = `Updated ${task.title}`;
  const tasks = state.tasks.map((v) =>
    v.id === action.payload.id ? action.payload : v,
  );
  return updateState(state, title, { tasks });
}
