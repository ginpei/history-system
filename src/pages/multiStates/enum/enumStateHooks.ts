import { useSelector } from "react-redux";
import { MultiStatesPageStoreState } from "../store/MultiStatesPageStoreState";
import { ColorOption, EnumState } from "./EnumState";

export function useColor(): ColorOption {
  return useSelector((v: MultiStatesPageStoreState) => v.enum.present.color);
}

export function useBackgroundColor(): ColorOption {
  return useSelector(
    (v: MultiStatesPageStoreState) => v.enum.present.backgroundColor,
  );
}

export function useEnumHistories(): [EnumState[], EnumState, EnumState[]] {
  return useSelector(
    (v: MultiStatesPageStoreState): [EnumState[], EnumState, EnumState[]] => [
      v.enum.past,
      v.enum.present,
      v.enum.future,
    ],
    (a, b) => a[0] === b[0] && a[1] === b[1] && a[2] === b[2],
  );
}
