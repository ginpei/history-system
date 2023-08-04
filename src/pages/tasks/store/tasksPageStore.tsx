import { configureStore, createSlice } from "@reduxjs/toolkit";
import React from "react";
import { Provider, useSelector } from "react-redux";
import undoable from "redux-undo";
import { buildHistory } from "../../../lib/history/AppHistory";
import { Task } from "../../../lib/task/Task";
import { TasksPageState, TasksStoreValue } from "./TasksPageHistory";
import * as tasksReducers from "./tasksReducers";

const initialTaskState: TasksStoreValue = {
  ...buildHistory("Initial"),
  hideCompleted: false,
  tasks: [],
};

const slice = createSlice({
  name: "tasks",
  initialState: initialTaskState,
  reducers: tasksReducers,
});

export const taskActions = slice.actions;

const store = configureStore({
  reducer: {
    tasks: undoable(slice.reducer),
  },
});

export function TasksPageStateProvider(props: {
  children: React.ReactNode;
}): JSX.Element {
  return <Provider store={store}>{props.children}</Provider>;
}

export function useTasks(): Task[] {
  return useSelector<TasksPageState, Task[]>((v) => v.tasks.present.tasks);
}

export function useHideCompleted(): TasksStoreValue["hideCompleted"] {
  return useSelector((v: TasksPageState) => v.tasks.present.hideCompleted);
}
