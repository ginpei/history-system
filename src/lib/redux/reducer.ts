import { PayloadAction } from "@reduxjs/toolkit";

export type MutationReducer<Payload, State> = (
  state: State,
  action: PayloadAction<Payload>,
) => void;
