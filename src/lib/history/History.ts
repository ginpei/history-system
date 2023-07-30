import { ActionInput } from "./Action";

export interface History<T extends HistoryType, Input extends ActionInput> {
  action: string;
  id: string;
  input: Input[T];
}

export type HistoryType = "undo" | "redo";

export function buildHistory<T extends HistoryType, Input extends ActionInput>(
  action: string,
  input: Input[T],
): History<T, Input> {
  return {
    action,
    id: crypto.randomUUID(),
    input,
  };
}
