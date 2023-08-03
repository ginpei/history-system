import { PayloadAction } from "@reduxjs/toolkit";

export interface History {
  id: string;
  title: string;
}

export type HistoryReducer<Payload, H extends History> = (
  state: H,
  action: PayloadAction<Payload>,
) => H;

export function buildHistory(title: string): History {
  return {
    id: crypto.randomUUID(),
    title,
  };
}

export function updateHistory<T extends History>(
  state: T,
  title: string,
  updates: Partial<Omit<T, keyof History>>,
): T {
  return {
    ...state,
    ...updates,
    id: crypto.randomUUID(),
    title,
  };
}
