import { configureStore } from "@reduxjs/toolkit";
import undoable from "redux-undo";
import { enumSlice } from "../enum/enumSlice";
import { numberSlice } from "../number/numberSlice";
import { pageStateSlice } from "../pageState/pageStateSlice";

export const multiStatesPageStore = configureStore({
  reducer: {
    enum: undoable(enumSlice.reducer),
    number: numberSlice.reducer,
    pageState: pageStateSlice.reducer,
  },
});
