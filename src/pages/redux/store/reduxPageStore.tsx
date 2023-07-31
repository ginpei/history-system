import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";
import React from "react";
import { Provider, useSelector } from "react-redux";
import undoable, { StateWithHistory } from "redux-undo";
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

function updateState<T extends { id: string; title: string }>(
  state: T,
  title: string,
  updates: Partial<Omit<T, "id" | "title">>,
): T {
  return {
    ...state,
    ...updates,
    id: crypto.randomUUID(),
    title,
  };
}

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

export function useHistories(): [TaskState[], TaskState, TaskState[]] {
  return useSelector(
    (v: StateWithHistory<TaskState>) => [v.past, v.present, v.future],
    (a, b) => a[0] === b[0] && a[1] === b[1] && a[2] === b[2],
  );
}

export function useHasHistories(): [boolean, boolean] {
  return useSelector(
    (state: StateWithHistory<TaskState>) => [
      state.past.length > 0,
      state.future.length > 0,
    ],
    (a, b) => a[0] === b[0] && a[1] === b[1],
  );
}
