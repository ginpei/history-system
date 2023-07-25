import { ActionInput, ActionSet } from "../history/Action";
import { Task, buildTask } from "./Task";
import {
  addTaskAt,
  findTask,
  findTaskIndex,
  removeTaskFrom,
  toggleTask,
  updateTask,
} from "./taskArrayManipulators";

interface TaskState {
  tasks: Task[];
}

export type TaskActionInput =
  | TaskAddActionInput
  | TaskDoneActionInput
  | TaskUpdateActionInput;

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

const update: ActionSet<TaskState, TaskUpdateActionInput> = {
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
  update,
};

function toTaskAction(action: TaskAction): TaskAction {
  return action;
}
