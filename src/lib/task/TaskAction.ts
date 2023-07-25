import { ActionInput, ActionSet } from "../history/Action";
import { Task, buildTask } from "./Task";
import {
  addTaskAt,
  findTask,
  findTaskIndex,
  removeTaskFrom,
  toggleTask,
} from "./taskArrayManipulators";

interface TaskState {
  tasks: Task[];
}

export type TaskActionInput = TaskAddActionInput | TaskDoneActionInput;

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

type TaskAction = ActionSet<TaskState, TaskAddActionInput>;

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

const done: ActionSet<TaskState, TaskDoneActionInput> = {
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

export const taskActions = {
  add: toTaskAction({
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
  }),
  done,
};

function toTaskAction(action: TaskAction): TaskAction {
  return action;
}
