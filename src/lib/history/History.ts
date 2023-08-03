export interface History {
  id: string;
  title: string;
}

export function updateHistory<T extends History>(
  state: T,
  title: string,
  updates: Partial<Omit<T, keyof History>>,
): T {
  return {
    ...state,
    ...updates,
    id: crypto.randomUUID(),
    title,
  };
}
