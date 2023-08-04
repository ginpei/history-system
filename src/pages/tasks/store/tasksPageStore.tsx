import { configureStore, createSlice } from "@reduxjs/toolkit";
import React from "react";
import { Provider, useSelector } from "react-redux";
import undoable from "redux-undo";
import { buildHistory } from "../../../lib/history/AppHistory";
import { Task } from "../../../lib/task/Task";
import { TasksPageStoreState, TasksStoreValue } from "./TasksPageHistory";
import * as tasksReducers from "./tasksReducers";

const initialTaskState: TasksStoreValue = {
  ...buildHistory("Initial"),
  hideCompleted: false,
  tasks: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState: initialTaskState,
  reducers: tasksReducers,
});

export const taskActions = tasksSlice.actions;

const store = configureStore({
  reducer: {
    tasks: undoable(tasksSlice.reducer),
  },
});

export function TasksPageStateProvider(props: {
  children: React.ReactNode;
}): JSX.Element {
  return <Provider store={store}>{props.children}</Provider>;
}

export function useTasks(): Task[] {
  return useSelector<TasksPageStoreState, Task[]>((v) => v.tasks.present.tasks);
}

export function useHideCompleted(): TasksStoreValue["hideCompleted"] {
  return useSelector((v: TasksPageStoreState) => v.tasks.present.hideCompleted);
}
