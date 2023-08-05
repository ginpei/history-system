import { useSelector } from "react-redux";
import { MultiStatesPageStoreState } from "../store/MultiStatesPageStoreState";
import { NumberState } from "./NumberState";

export function useNumber(): number {
  return useSelector((v: MultiStatesPageStoreState) => v.number.present.number);
}

export function useNumberHistories(): [
  NumberState[],
  NumberState,
  NumberState[],
] {
  return useSelector(
    (
      v: MultiStatesPageStoreState,
    ): [NumberState[], NumberState, NumberState[]] => [
      v.number.past,
      v.number.present,
      v.number.future,
    ],
    (a, b) => a[0] === b[0] && a[1] === b[1] && a[2] === b[2],
  );
}
