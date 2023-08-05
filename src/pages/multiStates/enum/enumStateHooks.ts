import { useSelector } from "react-redux";
import { MultiStatesPageStoreState } from "../store/MultiStatesPageStoreState";
import { ColorOption } from "./EnumState";

export function useColor(): ColorOption {
  return useSelector((v: MultiStatesPageStoreState) => v.enum.present.color);
}

export function useBackgroundColor(): ColorOption {
  return useSelector(
    (v: MultiStatesPageStoreState) => v.enum.present.backgroundColor,
  );
}
