import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import { Provider } from "react-redux";
import undoable from "redux-undo";
import { pageStateSlice } from "./pageState/pageStateSlice";
import { tasksSlice } from "./tasks/tasksSlice";

const taskPageStore = configureStore({
  reducer: {
    pageState: pageStateSlice.reducer,
    tasks: undoable(tasksSlice.reducer),
  },
});

export function TasksPageStoreProvider(props: {
  children: React.ReactNode;
}): JSX.Element {
  return <Provider store={taskPageStore}>{props.children}</Provider>;
}
