import { EnumState } from "../enum/EnumState";
import { NumberState } from "../number/NumberState";

export interface MultiStatesPageStoreState {
  // pageState: MultiStatesPageState;
  enum: EnumState;
  number: NumberState;
}
