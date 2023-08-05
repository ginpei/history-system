import { EnumState } from "../enum/EnumState";
import { NumberState } from "../number/NumberState";
import { PageState } from "../pageState/PageState";

export interface MultiStatesPageStoreState {
  enum: EnumState;
  number: NumberState;
  pageState: PageState;
}
