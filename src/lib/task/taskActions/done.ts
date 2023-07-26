import { ActionInput, ActionSet } from "../../history/Action";
import { TaskState } from "../TaskState";
import { toggleTask } from "../taskArrayManipulators";

export type TaskDoneActionInput = ActionInput<{
  exec: {
    done: boolean;
    taskId: string;
  };
  undo: {
    done: boolean;
    taskId: string;
  };
  redo: {
    done: boolean;
    taskId: string;
  };
}>;

export const done: ActionSet<TaskState, TaskDoneActionInput> = {
  exec(state, input) {
    return {
      state: {
        ...state,
        tasks: toggleTask(state.tasks, input.taskId, input.done),
      },
      output: {
        done: !input.done,
        taskId: input.taskId,
      },
    };
  },
  undo(state, input) {
    return {
      state: {
        ...state,
        tasks: toggleTask(state.tasks, input.taskId, input.done),
      },
      output: {
        done: !input.done,
        taskId: input.taskId,
      },
    };
  },
  redo(state, input) {
    return {
      state: {
        ...state,
        tasks: toggleTask(state.tasks, input.taskId, input.done),
      },
      output: {
        done: !input.done,
        taskId: input.taskId,
      },
    };
  },
};
