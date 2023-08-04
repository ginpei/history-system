// TODO rename to `tasksReducer`

import {
  HistoryReducer,
  updateHistory,
} from "../../../../lib/history/AppHistory";
import { Task } from "../../../../lib/task/Task";
import { findTask } from "../../../../lib/task/taskArrayManipulators";
import { TasksStoreValue } from "../TasksPageHistory";

type TaskPageReducer<Payload> = HistoryReducer<Payload, TasksStoreValue>;

export const add: TaskPageReducer<Task> = (state, action) => {
  const task = action.payload;
  const title = `Added ${task.title}`;
  const tasks = [...state.tasks, task];
  return updateHistory(state, title, { tasks });
};

export const remove: TaskPageReducer<Pick<Task, "id">> = (state, action) => {
  const task = findTask(state.tasks, action.payload.id);
  const title = `Removed ${task.title}`;
  const tasks = state.tasks.filter((v) => v.id !== action.payload.id);
  return updateHistory(state, title, { tasks });
};

export const update: TaskPageReducer<Task> = (state, action) => {
  const task = action.payload;
  const title = `Updated ${task.title}`;
  const tasks = state.tasks.map((v) =>
    v.id === action.payload.id ? action.payload : v,
  );
  return updateHistory(state, title, { tasks });
};
