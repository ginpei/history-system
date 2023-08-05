import { useSelector } from "react-redux";
import { MultiStatesPageStoreState } from "../store/MultiStatesPageStoreState";

export function useNumber(): number {
  return useSelector((v: MultiStatesPageStoreState) => v.number.number);
}
