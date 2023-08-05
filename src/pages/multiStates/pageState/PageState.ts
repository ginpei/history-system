export interface PageState {
  theme: PageTheme;
}

export type PageTheme = (typeof pageThemes)[number];

export const pageThemes = ["light", "dark"];
