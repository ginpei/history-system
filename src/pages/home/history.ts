import { useCallback, useState } from "react";
import { ActionInput } from "../../lib/history/Action";
import { TaskState } from "../../lib/task/TaskState";
import { TaskActionInput, taskActions } from "../../lib/task/taskActions";

interface History<T extends "undo" | "redo", Input extends ActionInput> {
  action: string;
  id: string;
  input: Input[T];
}

type TaskHistory<T extends "undo" | "redo"> = History<T, TaskActionInput>;

function buildTaskHistory<T extends "undo" | "redo">(
  action: string,
  input: TaskActionInput[T],
): TaskHistory<T> {
  return {
    action,
    id: crypto.randomUUID(),
    input,
  };
}

/**
 * @example
 * const [history, redoHistory, setHistory, setRedoHistory] = useTaskHistory();
 */
export function useTaskHistory(): [
  TaskHistory<"undo">[],
  TaskHistory<"redo">[],
  (...args: Parameters<typeof buildTaskHistory>) => void,
  (taskState: TaskState) => TaskState,
  (taskState: TaskState) => TaskState,
] {
  const [history, setHistory] = useState<TaskHistory<"undo">[]>([]);
  const [redoHistory, setRedoHistory] = useState<TaskHistory<"redo">[]>([]);

  const undo = useCallback(
    (taskState: TaskState): TaskState => {
      const [lastHistory, ...restHistory] = history;
      if (!lastHistory) {
        return taskState;
      }

      // TODO solve types
      const action = lastHistory.action as keyof typeof taskActions;
      const actionSet = taskActions[action];

      const { state, output } = actionSet.undo(
        taskState,
        lastHistory.input as any,
      );

      setHistory(restHistory);
      setRedoHistory([buildTaskHistory(action, output), ...redoHistory]);

      return state;
    },
    [history, redoHistory],
  );

  const add = useCallback(
    (...args: Parameters<typeof buildTaskHistory>) => {
      const [action, input] = args;
      setHistory([buildTaskHistory(action, input), ...history]);
      setRedoHistory([]);
      // TODO
    },
    [history],
  );

  const redo = useCallback(
    (taskState: TaskState): TaskState => {
      const [prevHistory, ...restRedoHistory] = redoHistory;
      if (!prevHistory) {
        return taskState;
      }

      // TODO solve types
      const action = prevHistory.action as keyof typeof taskActions;
      const actionSet = taskActions[action];

      const { state, output } = actionSet.redo(
        taskState,
        prevHistory.input as any,
      );

      setHistory([buildTaskHistory(action, output), ...history]);
      setRedoHistory(restRedoHistory);

      return state;
    },
    [history, redoHistory],
  );

  return [history, redoHistory, add, undo, redo];
}
