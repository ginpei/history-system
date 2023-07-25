interface ActionInputMap {
  exec: Record<string, unknown>;
  undo: Record<string, unknown>;
  redo: Record<string, unknown>;
}

export type ActionInput<T extends ActionInputMap> = {
  exec: T["exec"];
  undo: T["undo"];
  redo: T["redo"];
};

export type ActionSet<
  State,
  Input extends ActionInput<T>,
  T extends ActionInputMap = ActionInputMap,
> = {
  exec: (
    state: State,
    input: Input["exec"],
  ) => {
    state: State;
    output: Input["undo"];
  };
  undo: (
    state: State,
    input: Input["undo"],
  ) => {
    state: State;
    output: Input["redo"];
  };
  redo: (
    state: State,
    input: Input["redo"],
  ) => {
    state: State;
    output: Input["undo"];
  };
};
