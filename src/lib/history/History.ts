import { ActionInput } from "./Action";

export interface History<T extends "undo" | "redo", Input extends ActionInput> {
  action: string;
  id: string;
  input: Input[T];
}

export function buildHistory<
  T extends "undo" | "redo",
  Input extends ActionInput,
>(action: string, input: Input[T]): History<T, Input> {
  return {
    action,
    id: crypto.randomUUID(),
    input,
  };
}
