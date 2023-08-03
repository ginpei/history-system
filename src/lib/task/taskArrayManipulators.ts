import { Task } from "./Task";

export function findTask(tasks: Task[], taskId: string): Task {
  const task = tasks.find((v) => v.id === taskId);
  if (!task) {
    throw new Error(`Task not found: ${taskId}`);
  }
  return task;
}
