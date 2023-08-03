import { PayloadAction } from "@reduxjs/toolkit";

export interface AppHistory {
  id: string;
  title: string;
}

export type HistoryReducer<Payload, H extends AppHistory> = (
  state: H,
  action: PayloadAction<Payload>,
) => H;

export function buildHistory(title: string): AppHistory {
  return {
    id: crypto.randomUUID(),
    title,
  };
}

export function updateHistory<T extends AppHistory>(
  state: T,
  title: string,
  updates: Partial<Omit<T, keyof AppHistory>>,
): T {
  return {
    ...state,
    ...updates,
    id: crypto.randomUUID(),
    title,
  };
}
