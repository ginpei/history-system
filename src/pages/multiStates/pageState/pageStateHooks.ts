import { useSelector } from "react-redux";
import { MultiStatesPageStoreState } from "../store/MultiStatesPageStoreState";
import { PageTheme } from "./PageState";

export function useTheme(): PageTheme {
  return useSelector((v: MultiStatesPageStoreState) => v.pageState.theme);
}
