// TODO rename to `tasksReducer`

import { PayloadAction } from "@reduxjs/toolkit";
import { TasksPageStateValue } from "./TasksPageHistory";

type PageStateReducer<Payload> = (
  state: TasksPageStateValue,
  action: PayloadAction<Payload>,
) => void;

export const toggleHideCompleted: PageStateReducer<{
  hideCompleted: boolean;
}> = (state, action) => {
  state.hideCompleted = action.payload.hideCompleted;
};
