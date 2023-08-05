import { configureStore } from "@reduxjs/toolkit";
import { enumSlice } from "../enum/enumSlice";

export const multiStatesPageStore = configureStore({
  reducer: {
    enum: enumSlice.reducer,
  },
});
