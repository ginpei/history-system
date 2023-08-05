import { HistoryReducer, updateHistory } from "../../../lib/history/AppHistory";
import { NumberState } from "./NumberState";

type EnumReducer<Payload> = HistoryReducer<Payload, NumberState>;

export const add: EnumReducer<number> = (state, action) => {
  return updateHistory(state, `Add ${action.payload}`, {
    number: state.number + action.payload,
  });
};

export const set: EnumReducer<number> = (state, action) => {
  return updateHistory(state, `Set to ${action.payload}`, {
    number: action.payload,
  });
};
