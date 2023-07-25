export interface Task {
  done: boolean;
  id: string;
  title: string;
}

export function buildTask(initial: Pick<Task, "title">): Task {
  return {
    done: false,
    id: crypto.randomUUID(),
    title: initial.title,
  };
}
