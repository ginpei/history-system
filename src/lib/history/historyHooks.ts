import { useSelector } from "react-redux";
import { StateWithHistory } from "redux-undo";
import { History } from "./History";

export function useHistories<T extends History>(): [T[], T, T[]] {
  return useSelector(
    (v: StateWithHistory<T>) => [v.past, v.present, v.future],
    (a, b) => a[0] === b[0] && a[1] === b[1] && a[2] === b[2],
  );
}
