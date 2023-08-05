import { HistoryReducer, updateHistory } from "../../../lib/history/AppHistory";
import { ColorOption, EnumState } from "./EnumState";

type EnumReducer<Payload> = HistoryReducer<Payload, EnumState>;

export const setColor: EnumReducer<ColorOption> = (state, action) => {
  const color = action.payload;
  const title = `Set color to ${color}`;
  return updateHistory(state, title, { color });
};

export const setBackgroundColor: EnumReducer<ColorOption> = (state, action) => {
  const backgroundColor = action.payload;
  const title = `Set background color to ${backgroundColor}`;
  return updateHistory(state, title, { backgroundColor });
};
