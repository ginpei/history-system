import { createSlice } from "@reduxjs/toolkit";
import { PageState } from "./PageState";
import * as pageStateReducers from "./pageStateReducers";

const initialPageStateState: PageState = {
  theme: "light",
};

export const pageStateSlice = createSlice({
  name: "pageState",
  initialState: initialPageStateState,
  reducers: pageStateReducers,
});

export const pageStateActions = pageStateSlice.actions;
