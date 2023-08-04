import { createSlice } from "@reduxjs/toolkit";
import { buildHistory } from "../../../../lib/history/AppHistory";
import { TasksStoreValue } from "../TasksPageHistory";
import * as tasksReducers from "./tasksReducers";

const initialTaskState: TasksStoreValue = {
  ...buildHistory("Initial"),
  tasks: [],
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: initialTaskState,
  reducers: tasksReducers,
});

export const taskActions = tasksSlice.actions;
