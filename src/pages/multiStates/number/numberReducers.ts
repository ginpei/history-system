import { MutationReducer } from "../../../lib/redux/reducer";
import { NumberState } from "./NumberState";

type EnumReducer<Payload> = MutationReducer<Payload, NumberState>;

export const add: EnumReducer<number> = (state, action) => {
  state.number += action.payload;
};

export const set: EnumReducer<number> = (state, action) => {
  state.number = action.payload;
};
