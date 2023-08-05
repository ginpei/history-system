import { MutationReducer } from "../../../lib/redux/reducer";
import { PageState, PageTheme } from "./PageState";

type EnumReducer<Payload> = MutationReducer<Payload, PageState>;

export const set: EnumReducer<PageTheme> = (state, action) => {
  state.theme = action.payload;
};
