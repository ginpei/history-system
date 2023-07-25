import { Task } from "./Task";

/**
 *
 * @param index `-1` means prepend
 */
export function addTaskAt(tasks: Task[], newTask: Task, index = -1): Task[] {
  const newTasks = [...tasks];
  if (index === -1) {
    newTasks.unshift(newTask);
  } else {
    newTasks.splice(index, 0, newTask);
  }
  return newTasks;
}

export function removeTaskFrom(tasks: Task[], taskId: string): Task[] {
  return tasks.filter((v) => v.id !== taskId);
}

export function toggleTask(
  tasks: Task[],
  taskId: string,
  done: boolean,
): Task[] {
  return tasks.map((v) => (v.id === taskId ? { ...v, done } : v));
}

export function findTask(tasks: Task[], taskId: string): Task {
  const task = tasks.find((v) => v.id === taskId);
  if (!task) {
    throw new Error(`Task not found: ${taskId}`);
  }
  return task;
}

export function findTaskIndex(tasks: Task[], taskId: string): number {
  const index = tasks.findIndex((v) => v.id === taskId);
  if (index === -1) {
    throw new Error(`Task not found: ${taskId}`);
  }
  return index;
}
