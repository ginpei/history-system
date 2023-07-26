import { TaskAddActionInput, add } from "./add";
import { TaskDoneActionInput, done } from "./done";
import { TaskRemoveActionInput, remove } from "./remove";
import { TaskUpdateActionInput, update } from "./update";

export type TaskActionInput =
  | TaskAddActionInput
  | TaskDoneActionInput
  | TaskUpdateActionInput
  | TaskRemoveActionInput;

export const taskActions = {
  add,
  done,
  update,
  remove,
};
