import { createSlice } from "@reduxjs/toolkit";
import { EnumState } from "./EnumState";
import * as enumReducers from "./enumReducers";

const initialEnumState: EnumState = {
  color: "black",
  backgroundColor: "white",
};

export const enumSlice = createSlice({
  name: "enum",
  initialState: initialEnumState,
  reducers: enumReducers,
});

export const enumActions = enumSlice.actions;
