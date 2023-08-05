import { StateWithHistory } from "redux-undo";
import { EnumState } from "../enum/EnumState";
import { NumberState } from "../number/NumberState";
import { PageState } from "../pageState/PageState";

export interface MultiStatesPageStoreState {
  enum: StateWithHistory<EnumState>;
  number: StateWithHistory<NumberState>;
  pageState: PageState;
}
