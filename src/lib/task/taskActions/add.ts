import { ActionInput, ActionSet } from "../../history/Action";
import { Task, buildTask } from "../Task";
import { TaskState } from "../TaskState";
import {
  addTaskAt,
  findTask,
  findTaskIndex,
  removeTaskFrom,
} from "../taskArrayManipulators";

export type TaskAddActionInput = ActionInput<{
  exec: {
    title: string;
  };
  undo: {
    taskId: string;
  };
  redo: {
    index: number;
    task: Task;
  };
}>;

export const add: ActionSet<TaskState, TaskAddActionInput> = {
  exec(state, input) {
    const task = buildTask({ title: input.title });

    return {
      state: {
        tasks: addTaskAt(state.tasks, task),
      },
      output: {
        taskId: task.id,
      },
    };
  },
  undo(state, input) {
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
  redo(state, input) {
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
};
