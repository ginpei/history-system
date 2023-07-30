import { useCallback, useState } from "react";
import { History, HistoryType, buildHistory } from "../../lib/history/History";
import { TaskState } from "../../lib/task/TaskState";
import { TaskActionInput, taskActions } from "../../lib/task/taskActions";

type TaskHistory<T extends HistoryType> = History<T, TaskActionInput>;

/**
 * @example
 * const [history, redoHistory, setHistory, setRedoHistory] = useTaskHistory();
 */
export function useTaskHistory(): [
  TaskHistory<"undo">[],
  TaskHistory<"redo">[],
  <T extends HistoryType>(action: string, input: TaskActionInput[T]) => void,
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
      setRedoHistory([buildHistory(action, output), ...redoHistory]);

      return state;
    },
    [history, redoHistory],
  );

  const add = useCallback(
    (action: string, input: TaskActionInput["undo"]) => {
      setHistory([buildHistory(action, input), ...history]);
      setRedoHistory([]);
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

      setHistory([buildHistory(action, output), ...history]);
      setRedoHistory(restRedoHistory);

      return state;
    },
    [history, redoHistory],
  );

  return [history, redoHistory, add, undo, redo];
}
