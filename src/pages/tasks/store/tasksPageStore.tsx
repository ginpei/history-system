import { configureStore, createSlice } from "@reduxjs/toolkit";
import React from "react";
import { Provider, useSelector } from "react-redux";
import undoable, { StateWithHistory } from "redux-undo";
import { Task } from "../../../lib/task/Task";
import { TasksPageHistory, buildTasksPageHistory } from "./TasksPageHistory";
import * as reducers from "./reducers";

const initialState = buildTasksPageHistory("Initial");

const slice = createSlice({
  name: "tasksPage",
  initialState,
  reducers,
});

export const taskActions = slice.actions;

const store = configureStore({
  reducer: undoable(slice.reducer),
});

export function TasksPageStateProvider(props: {
  children: React.ReactNode;
}): JSX.Element {
  return <Provider store={store}>{props.children}</Provider>;
}

export function useTasks(): Task[] {
  return useSelector<StateWithHistory<TasksPageHistory>, Task[]>(
    (v) => v.present.tasks,
  );
}

export function useHideCompleted(): TasksPageHistory["hideCompleted"] {
  return useSelector(
    (v: StateWithHistory<TasksPageHistory>) => v.present.hideCompleted,
  );
}
