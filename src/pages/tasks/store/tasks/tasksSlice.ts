import { createSlice } from "@reduxjs/toolkit";
import { buildHistory } from "../../../../lib/history/AppHistory";
import { TasksState } from "./TasksState";
import * as tasksReducers from "./tasksReducers";

const initialTaskState: TasksState = {
  ...buildHistory("Initial"),
  tasks: [],
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: initialTaskState,
  reducers: tasksReducers,
});

export const taskActions = tasksSlice.actions;
