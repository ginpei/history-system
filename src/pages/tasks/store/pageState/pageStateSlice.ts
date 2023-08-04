import { createSlice } from "@reduxjs/toolkit";
import { TasksPageStateValue } from "../TasksPageHistory";
import * as pageStateReducers from "./pageStateReducers";

const initialPageState: TasksPageStateValue = {
  hideCompleted: false,
};

export const pageStateSlice = createSlice({
  name: "pageState",
  initialState: initialPageState,
  reducers: pageStateReducers,
});

export const pageStateActions = pageStateSlice.actions;
