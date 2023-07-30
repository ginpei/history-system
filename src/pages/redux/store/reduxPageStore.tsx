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
      state.id = crypto.randomUUID();
      state.title = `Added ${task.title}`;

      state.tasks.push(task);
    },
    remove(state, action: PayloadAction<Pick<Task, "id">>) {
      const task = findTask(state.tasks, action.payload.id);
      state.id = crypto.randomUUID();
      state.title = `Removed ${task.title}`;

      state.tasks = state.tasks.filter((v) => v.id !== action.payload.id);
    },
    update(state, action: PayloadAction<Task>) {
      const task = action.payload;
      state.id = crypto.randomUUID();
      state.title = `Updated ${task.title}`;

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

export function useHistories(): [TaskState[], TaskState, TaskState[]] {
  return useSelector((v: StateWithHistory<TaskState>) => [
    v.past,
    v.present,
    v.future,
  ]);
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
