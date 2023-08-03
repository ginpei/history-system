import { configureStore, createSlice } from "@reduxjs/toolkit";
import React from "react";
import { Provider, useSelector } from "react-redux";
import undoable, { StateWithHistory } from "redux-undo";
import { Task } from "../../../lib/task/Task";
import { TaskHistory } from "../../../lib/task/TaskState";
import * as reducers from "./reducers";

const initialState: TaskHistory = {
  id: crypto.randomUUID(),
  tasks: [],
  title: "Initial",
};

const slice = createSlice({
  name: "reduxPage",
  initialState,
  reducers,
});

export const taskActions = slice.actions;

const store = configureStore({
  reducer: undoable(slice.reducer),
});

export function ReduxPageStateProvider(props: {
  children: React.ReactNode;
}): JSX.Element {
  return <Provider store={store}>{props.children}</Provider>;
}

export function useTasks(): Task[] {
  return useSelector<StateWithHistory<TaskHistory>, Task[]>(
    (v) => v.present.tasks,
  );
}
