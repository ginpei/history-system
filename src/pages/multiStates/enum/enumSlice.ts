import { Action, createSlice } from "@reduxjs/toolkit";
import { UndoableOptions } from "redux-undo";
import { EnumState } from "./EnumState";
import * as enumReducers from "./enumReducers";

const undoType = "EnumUndo";
const redoType = "EnumRedo";
export const enumUndoableOptions: UndoableOptions = {
  undoType: undoType,
  redoType: redoType,
};
export const enumUndoAction: Readonly<Action> = { type: undoType };
export const enumRedoAction: Readonly<Action> = { type: redoType };

const initialEnumState: EnumState = {
  backgroundColor: "white",
  color: "black",
  id: "initial",
  title: "Initial",
};

export const enumSlice = createSlice({
  name: "enum",
  initialState: initialEnumState,
  reducers: enumReducers,
});

export const enumActions = enumSlice.actions;
