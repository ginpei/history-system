import { MutationReducer } from "../../../lib/redux/reducer";
import { ColorOption, EnumState } from "./EnumState";

type EnumReducer<Payload> = MutationReducer<Payload, EnumState>;

export const setColor: EnumReducer<ColorOption> = (state, action) => {
  state.color = action.payload;
};

export const setBackgroundColor: EnumReducer<ColorOption> = (state, action) => {
  state.backgroundColor = action.payload;
};
