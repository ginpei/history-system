import { ActionInput, ActionSet } from "../../history/Action";
import { Task } from "../Task";
import { TaskState } from "../TaskState";
import {
  addTaskAt,
  findTask,
  findTaskIndex,
  removeTaskFrom,
} from "../taskArrayManipulators";

export type TaskRemoveActionInput = ActionInput<{
  exec: {
    taskId: string;
  };
  undo: {
    index: number;
    task: Task;
  };
  redo: {
    taskId: string;
  };
}>;

export const remove: ActionSet<TaskState, TaskRemoveActionInput> = {
  exec(state, input) {
    const task = findTask(state.tasks, input.taskId);
    const index = findTaskIndex(state.tasks, input.taskId);

    return {
      state: {
        ...state,
        tasks: removeTaskFrom(state.tasks, input.taskId),
      },
      output: { index, task },
    };
  },
  undo(state, input) {
    return {
      state: {
        ...state,
        tasks: addTaskAt(state.tasks, input.task, input.index),
      },
      output: {
        taskId: input.task.id,
      },
    };
  },
  redo(state, input) {
    const task = findTask(state.tasks, input.taskId);
    const index = findTaskIndex(state.tasks, input.taskId);

    return {
      state: {
        ...state,
        tasks: removeTaskFrom(state.tasks, input.taskId),
      },
      output: { index, task },
    };
  },
};
