import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";
import React from "react";
import { Provider, useSelector } from "react-redux";
import { Task } from "../../../lib/task/Task";
import { TaskState } from "../../../lib/task/TaskState";

const initialState: TaskState = {
  tasks: [],
};

const slice = createSlice({
  name: "reduxPage",
  initialState,
  reducers: {
    add(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload);
    },
    remove(state, action: PayloadAction<Pick<Task, "id">>) {
      state.tasks = state.tasks.filter((v) => v.id !== action.payload.id);
    },
    update(state, action: PayloadAction<Task>) {
      state.tasks = state.tasks.map((v) => {
        if (v.id === action.payload.id) {
          return action.payload;
        }
        return v;
      });
    },
  },
});

export const taskActions = slice.actions;

const store = configureStore({
  reducer: slice.reducer,
});

export function ReduxPageStateProvider(props: {
  children: React.ReactNode;
}): JSX.Element {
  return <Provider store={store}>{props.children}</Provider>;
}

export function useTasks(): Task[] {
  return useSelector((v: TaskState) => v.tasks);
}
