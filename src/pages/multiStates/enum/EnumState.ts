import { AppHistory } from "../../../lib/history/AppHistory";

export interface EnumState extends AppHistory {
  color: ColorOption;
  backgroundColor: ColorOption;
}

export type ColorOption = (typeof options)[number];

export const options = ["black", "blue", "green", "red", "white"] as const;
