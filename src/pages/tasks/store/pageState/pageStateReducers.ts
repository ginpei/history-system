import { PayloadAction } from "@reduxjs/toolkit";
import { TasksPageState } from "./TasksPageState";

type PageStateReducer<Payload> = (
  state: TasksPageState,
  action: PayloadAction<Payload>,
) => void;

export const toggleHideCompleted: PageStateReducer<{
  hideCompleted: boolean;
}> = (state, action) => {
  state.hideCompleted = action.payload.hideCompleted;
};
