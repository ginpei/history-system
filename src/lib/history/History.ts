import { ActionInput } from "./Action";

export interface History<T extends "undo" | "redo", Input extends ActionInput> {
  action: string;
  id: string;
  input: Input[T];
}
