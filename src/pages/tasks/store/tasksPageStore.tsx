import { configureStore, createSlice } from "@reduxjs/toolkit";
import React from "react";
import { Provider, useSelector } from "react-redux";
import undoable from "redux-undo";
import { buildHistory } from "../../../lib/history/AppHistory";
import { Task } from "../../../lib/task/Task";
import {
  TasksPageStateValue,
  TasksPageStoreState,
  TasksStoreValue,
} from "./TasksPageHistory";
import * as tasksReducers from "./tasksReducers";
import * as pageStateReducers from "./pageStateReducers";

const initialTaskState: TasksStoreValue = {
  ...buildHistory("Initial"),
  tasks: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState: initialTaskState,
  reducers: tasksReducers,
});

export const taskActions = tasksSlice.actions;

const initialPageState: TasksPageStateValue = {
  hideCompleted: false,
};

const pageStateSlice = createSlice({
  name: "pageState",
  initialState: initialPageState,
  reducers: pageStateReducers,
});

export const pageStateActions = pageStateSlice.actions;

const store = configureStore({
  reducer: {
    pageState: pageStateSlice.reducer,
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

export function useHideCompleted(): TasksPageStateValue["hideCompleted"] {
  return useSelector((v: TasksPageStoreState) => v.pageState.hideCompleted);
}
