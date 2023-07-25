import { Dispatch, SetStateAction, useState } from "react";
import { TaskActionInput } from "../../lib/task/TaskAction";

export interface History<T extends TaskActionInput, S extends "undo" | "redo"> {
  action: string;
  id: string;
  input: T[S];
}

/**
 * @example
 * const [history, redoHistory, setHistory, setRedoHistory] = useTaskHistory();
 */
export function useTaskHistory(): [
  History<TaskActionInput, "undo">[],
  History<TaskActionInput, "redo">[],
  Dispatch<SetStateAction<History<TaskActionInput, "undo">[]>>,
  Dispatch<SetStateAction<History<TaskActionInput, "redo">[]>>,
] {
  const [history, setHistory] = useState<History<TaskActionInput, "undo">[]>(
    [],
  );
  const [redoHistory, setRedoHistory] = useState<
    History<TaskActionInput, "redo">[]
  >([]);

  return [history, redoHistory, setHistory, setRedoHistory];
}
