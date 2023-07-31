export interface State {
  id: string;
  title: string;
}

export function updateState<T extends State>(
  state: T,
  title: string,
  updates: Partial<Omit<T, "id" | "title">>,
): T {
  return {
    ...state,
    ...updates,
    id: crypto.randomUUID(),
    title,
  };
}
