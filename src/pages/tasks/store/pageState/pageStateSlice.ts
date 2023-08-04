import { createSlice } from "@reduxjs/toolkit";
import * as pageStateReducers from "./pageStateReducers";
import { TasksPageState } from "./TasksPageState";

const initialPageState: TasksPageState = {
  hideCompleted: false,
};

export const pageStateSlice = createSlice({
  name: "pageState",
  initialState: initialPageState,
  reducers: pageStateReducers,
});

export const pageStateActions = pageStateSlice.actions;
