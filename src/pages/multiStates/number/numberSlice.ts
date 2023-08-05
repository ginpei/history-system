import { createSlice } from "@reduxjs/toolkit";
import { NumberState } from "./NumberState";
import * as numberReducers from "./numberReducers";

const initialEnumState: NumberState = {
  number: 0,
};

export const numberSlice = createSlice({
  name: "number",
  initialState: initialEnumState,
  reducers: numberReducers,
});

export const numberActions = numberSlice.actions;
