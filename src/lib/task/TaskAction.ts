import { ActionInput, ActionSet } from "../history/Action";
import { Task, buildTask } from "./Task";

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

/**
 *
 * @param index `-1` means prepend
 */
function addTaskAt(tasks: Task[], newTask: Task, index = -1): Task[] {
  const newTasks = [...tasks];
  if (index === -1) {
    newTasks.unshift(newTask);
  } else {
    newTasks.splice(index, 0, newTask);
  }
  return newTasks;
}

function removeTaskFrom(tasks: Task[], taskId: string): Task[] {
  return tasks.filter((v) => v.id !== taskId);
}

function toggleTask(tasks: Task[], taskId: string, done: boolean): Task[] {
  return tasks.map((v) => (v.id === taskId ? { ...v, done } : v));
}

function findTask(tasks: Task[], taskId: string): Task {
  const task = tasks.find((v) => v.id === taskId);
  if (!task) {
    throw new Error(`Task not found: ${taskId}`);
  }
  return task;
}

function findTaskIndex(tasks: Task[], taskId: string): number {
  const index = tasks.findIndex((v) => v.id === taskId);
  if (index === -1) {
    throw new Error(`Task not found: ${taskId}`);
  }
  return index;
}

function toTaskAction(action: TaskAction): TaskAction {
  return action;
}
