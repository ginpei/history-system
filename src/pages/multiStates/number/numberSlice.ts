import { Action, createSlice } from "@reduxjs/toolkit";
import { NumberState } from "./NumberState";
import * as numberReducers from "./numberReducers";
import { UndoableOptions } from "redux-undo";

const undoType = "NumberUndo";
const redoType = "NumberRedo";
export const numberUndoableOptions: UndoableOptions = {
  undoType: undoType,
  redoType: redoType,
};
export const numberUndoAction: Readonly<Action> = { type: undoType };
export const numberRedoAction: Readonly<Action> = { type: redoType };

const initialEnumState: NumberState = {
  id: "initial",
  number: 0,
  title: "Initial",
};

export const numberSlice = createSlice({
  name: "number",
  initialState: initialEnumState,
  reducers: numberReducers,
});

export const numberActions = numberSlice.actions;
