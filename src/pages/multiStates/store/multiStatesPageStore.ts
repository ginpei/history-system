import { configureStore } from "@reduxjs/toolkit";
import undoable from "redux-undo";
import { enumSlice, enumUndoableOptions } from "../enum/enumSlice";
import { numberSlice } from "../number/numberSlice";
import { pageStateSlice } from "../pageState/pageStateSlice";

export const multiStatesPageStore = configureStore({
  reducer: {
    enum: undoable(enumSlice.reducer, enumUndoableOptions),
    number: undoable(numberSlice.reducer),
    pageState: pageStateSlice.reducer,
  },
});
