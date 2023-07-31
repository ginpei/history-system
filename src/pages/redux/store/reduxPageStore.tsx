import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";
import React from "react";
import { Provider, useSelector } from "react-redux";
import undoable, { StateWithHistory } from "redux-undo";
import { updateState } from "../../../lib/store/State";
import { Task } from "../../../lib/task/Task";
import { TaskState } from "../../../lib/task/TaskState";
import { findTask } from "../../../lib/task/taskArrayManipulators";

const initialState: TaskState = {
  id: crypto.randomUUID(),
  tasks: [],
  title: "Initial",
};

const slice = createSlice({
  name: "reduxPage",
  initialState,
  reducers: {
    add(state, action: PayloadAction<Task>) {
      const task = action.payload;
      const title = `Added ${task.title}`;
      const tasks = [...state.tasks, task];
      return updateState(state, title, { tasks });
    },
    remove(state, action: PayloadAction<Pick<Task, "id">>) {
      const task = findTask(state.tasks, action.payload.id);
      const title = `Removed ${task.title}`;
      const tasks = state.tasks.filter((v) => v.id !== action.payload.id);
      return updateState(state, title, { tasks });
    },
    update(state, action: PayloadAction<Task>) {
      const task = action.payload;
      const title = `Updated ${task.title}`;
      const tasks = state.tasks.map((v) =>
        v.id === action.payload.id ? action.payload : v,
      );
      return updateState(state, title, { tasks });
    },
  },
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
  return useSelector<StateWithHistory<TaskState>, Task[]>(
    (v) => v.present.tasks,
  );
}
