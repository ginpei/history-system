import { configureStore } from "@reduxjs/toolkit";
import { enumSlice } from "../enum/enumSlice";
import { numberSlice } from "../number/numberSlice";
import { pageStateSlice } from "../pageState/pageStateSlice";

export const multiStatesPageStore = configureStore({
  reducer: {
    enum: enumSlice.reducer,
    number: numberSlice.reducer,
    pageState: pageStateSlice.reducer,
  },
});
