import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";
import React from "react";
import { Provider, useSelector } from "react-redux";
import undoable, { StateWithHistory } from "redux-undo";
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

export function useHasHistories(): [boolean, boolean] {
  let lastState: StateWithHistory<TaskState> | null = null;
  let lastValue: [boolean, boolean] = [false, false];

  return useSelector((state: StateWithHistory<TaskState>) => {
    if (lastState === state) {
      return lastValue;
    }
    lastState = state;

    const value: [boolean, boolean] = [
      state.past.length > 0,
      state.future.length > 0,
    ];
    lastValue = value;

    return value;
  });
}
