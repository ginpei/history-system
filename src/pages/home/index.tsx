import type { NextPage } from "next";
import { useState } from "react";
import { HStack } from "../../src/lib/layout/HStack";
import { VStack } from "../../src/lib/layout/VStack";
import { Button } from "../../src/lib/style/Button";
import { H1 } from "../../src/lib/style/H1";
import { H2 } from "../../src/lib/style/H2";
import { Task } from "./Task";
import {
  TaskActionInput,
  TaskAddActionInput,
  TaskDoneActionInput,
  taskActions,
} from "../../lib/task/TaskAction";

interface History<
  T extends TaskAddActionInput | TaskDoneActionInput,
  S extends "undo" | "redo",
> {
  action: string;
  id: string;
  input: T[S];
}

const Home: NextPage = () => {
  return <HistoryPage />;
};

export default Home;

function HistoryPage(): JSX.Element {
  const [tasks, setTasks] = useState<Task[]>([
    {
      done: false,
      id: "1",
      title: "Task 1",
    },
    {
      done: false,
      id: "2",
      title: "Task 2",
    },
  ]);

  const [history, setHistory] = useState<History<TaskActionInput, "undo">[]>(
    [],
  );
  const [redoHistory, setRedoHistory] = useState<
    History<TaskActionInput, "redo">[]
  >([]);

  const onAddTaskClick = () => {
    const title = window.prompt("Task title");
    if (title === null) {
      return;
    }

    const { state, output } = taskActions.add.exec({ tasks }, { title });

    setTasks(state.tasks);
    setHistory([
      {
        action: "add",
        id: crypto.randomUUID(),
        input: { taskId: output.taskId },
      },
      ...history,
    ]);
    setRedoHistory([]);
  };

  const onUndoClick = () => {
    const [lastHistory, ...restHistory] = history;
    if (!lastHistory) {
      return;
    }

    const action = lastHistory.action;
    const actionSet = taskActions[action];
    const { state, output } = actionSet.undo({ tasks }, lastHistory.input);

    setTasks(state.tasks);
    setHistory(restHistory);
    setRedoHistory([
      {
        action,
        id: crypto.randomUUID(),
        input: output,
      },
      ...redoHistory,
    ]);
  };

  const onRedoClick = () => {
    const [prevHistory, ...restRedoHistory] = redoHistory;
    if (!prevHistory) {
      return;
    }

    const action = prevHistory.action;
    const actionSet = taskActions[action];
    const { state, output } = actionSet.redo({ tasks }, prevHistory.input);

    setTasks(state.tasks);
    setHistory([
      {
        action,
        id: crypto.randomUUID(),
        input: output,
      },
      ...history,
    ]);
    setRedoHistory(restRedoHistory);
  };

  const onTaskDoneChange = (taskId: string, done: boolean) => {
    const { state, output } = taskActions.done.exec(
      { tasks },
      { taskId, done },
    );

    setTasks(state.tasks);
    setHistory([
      {
        action: "done",
        id: crypto.randomUUID(),
        input: { taskId: output.taskId, done: output.done },
      },
      ...history,
    ]);
    setRedoHistory([]);
  };

  return (
    <div className="m-4">
      <VStack>
        <H1>History system</H1>
        <div className="flex gap-8 [&>*]:w-1/2">
          <VStack>
            <H2>Tasks</H2>
            <HStack>
              <Button onClick={onAddTaskClick}>Add task...</Button>
              <Button onClick={() => console.log(tasks)}>Log</Button>
            </HStack>
            <ul>
              {tasks.map((task) => (
                <li key={task.id}>
                  <label className="flex gap-1 items-baseline hover:underline">
                    <input
                      checked={task.done}
                      onChange={() => onTaskDoneChange(task.id, !task.done)}
                      type="checkbox"
                    />
                    {task.title}
                    <small>({task.id})</small>
                  </label>
                </li>
              ))}
            </ul>
          </VStack>
          <VStack>
            <H2>History</H2>
            <HStack>
              <Button disabled={history.length < 1} onClick={onUndoClick}>
                ← Undo
              </Button>
              <Button disabled={redoHistory.length < 1} onClick={onRedoClick}>
                Redo →
              </Button>
            </HStack>
            <ul className="[&>*]:border-t">
              {[...history].reverse().map((history, index, { length }) => (
                <li
                  className={`${index + 1 === length && "font-bold"}`}
                  key={history.id}
                >
                  {history.action} {JSON.stringify(history.input)}
                </li>
              ))}
              {redoHistory.map((history) => (
                <li className="text-gray-500" key={history.id}>
                  {history.action} {JSON.stringify(history.input)}
                </li>
              ))}
            </ul>
          </VStack>
        </div>
      </VStack>
    </div>
  );
}
