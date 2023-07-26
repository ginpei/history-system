import { ActionInput, ActionSet } from "../../history/Action";
import { TaskState } from "../TaskState";
import { findTask, updateTask } from "../taskArrayManipulators";

export type TaskUpdateActionInput = ActionInput<{
  exec: {
    taskId: string;
    title: string;
  };
  undo: {
    taskId: string;
    title: string;
  };
  redo: {
    taskId: string;
    title: string;
  };
}>;

export const update: ActionSet<TaskState, TaskUpdateActionInput> = {
  exec(state, input) {
    const curTask = findTask(state.tasks, input.taskId);
    const newTask = { ...curTask, title: input.title };

    return {
      state: {
        ...state,
        tasks: updateTask(state.tasks, newTask),
      },
      output: {
        taskId: input.taskId,
        title: curTask.title,
      },
    };
  },
  undo(state, input) {
    const curTask = findTask(state.tasks, input.taskId);
    const prevTask = { ...curTask, title: input.title };

    return {
      state: {
        ...state,
        tasks: updateTask(state.tasks, prevTask),
      },
      output: {
        taskId: input.taskId,
        title: curTask.title,
      },
    };
  },
  redo(state, input) {
    const curTask = findTask(state.tasks, input.taskId);
    const newTask = { ...curTask, title: input.title };

    return {
      state: {
        ...state,
        tasks: updateTask(state.tasks, newTask),
      },
      output: {
        taskId: input.taskId,
        title: curTask.title,
      },
    };
  },
};
