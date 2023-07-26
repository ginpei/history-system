import Head from "next/head";
import { useState } from "react";
import { Container } from "../../lib/layout/Container";
import { HStack } from "../../lib/layout/HStack";
import { VStack } from "../../lib/layout/VStack";
import { Button } from "../../lib/style/Button";
import { H1 } from "../../lib/style/H1";
import { H2 } from "../../lib/style/H2";
import { Task } from "../../lib/task/Task";
import { TaskState } from "../../lib/task/TaskState";
import { taskActions } from "../../lib/task/taskActions";
import { buildTaskHistory, useTaskHistory } from "./history";

const initialTasks: TaskState = {
  tasks: [
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
  ],
};

export function HomePage(): JSX.Element {
  const [taskState, setTaskState] = useState(initialTasks);
  const [history, redoHistory, setHistory, setRedoHistory] = useTaskHistory();

  const onAddTaskClick = () => {
    const title = window.prompt("Task title");
    if (title === null) {
      return;
    }

    const { state, output } = taskActions.add.exec(taskState, { title });

    setTaskState(state);
    setHistory([buildTaskHistory("add", output), ...history]);
    setRedoHistory([]);
  };

  const onUndoClick = () => {
    const [lastHistory, ...restHistory] = history;
    if (!lastHistory) {
      return;
    }

    // TODO solve types
    const action = lastHistory.action as keyof typeof taskActions;
    const actionSet = taskActions[action];

    const { state, output } = actionSet.undo(
      taskState,
      lastHistory.input as any,
    );

    setTaskState(state);
    setHistory(restHistory);
    setRedoHistory([buildTaskHistory(action, output), ...redoHistory]);
  };

  const onRedoClick = () => {
    const [prevHistory, ...restRedoHistory] = redoHistory;
    if (!prevHistory) {
      return;
    }

    // TODO solve types
    const action = prevHistory.action as keyof typeof taskActions;
    const actionSet = taskActions[action];

    const { state, output } = actionSet.redo(
      taskState,
      prevHistory.input as any,
    );

    setTaskState(state);
    setHistory([buildTaskHistory(action, output), ...history]);
    setRedoHistory(restRedoHistory);
  };

  const onTaskDoneChange = (taskId: string, done: boolean) => {
    const { state, output } = taskActions.done.exec(taskState, {
      taskId,
      done,
    });

    setTaskState(state);
    setHistory([buildTaskHistory("done", output), ...history]);
    setRedoHistory([]);
  };

  const onEditClick = (task: Task) => {
    const newTitle = window.prompt("Task title", task.title);
    if (newTitle === null || newTitle === task.title) {
      return;
    }

    const { state, output } = taskActions.update.exec(taskState, {
      taskId: task.id,
      title: newTitle,
    });

    setTaskState(state);
    setHistory([buildTaskHistory("update", output), ...history]);
    setRedoHistory([]);
  };

  const onRemoveClick = (task: Task) => {
    const ok = window.confirm(`Remove this task: "${task.title}"`);
    if (!ok) {
      return;
    }

    const { state, output } = taskActions.remove.exec(taskState, {
      taskId: task.id,
    });

    setTaskState(state);
    setHistory([buildTaskHistory("remove", output), ...history]);
    setRedoHistory([]);
  };

  return (
    <div className="my-4">
      <Head>
        <title>History system</title>
        <link rel="icon" href="/icon-512.png" />
      </Head>
      <Container>
        <VStack>
          <H1>History system</H1>
          <div className="flex gap-8 [&>*]:w-1/2">
            <VStack>
              <H2>Tasks</H2>
              <HStack>
                <Button onClick={onAddTaskClick}>Add task...</Button>
                <Button onClick={() => console.log(taskState)}>Log</Button>
              </HStack>
              <ul>
                {taskState.tasks.map((task) => (
                  <li
                    className="
                      flex gap-4
                      hover:bg-slate-50
                      [&>.controls]:invisible
                      [&:hover>.controls]:visible
                    "
                    key={task.id}
                  >
                    <label className="flex flex-1 gap-1 items-baseline hover:underline">
                      <input
                        checked={task.done}
                        onChange={() => onTaskDoneChange(task.id, !task.done)}
                        type="checkbox"
                      />
                      <span>
                        {task.title} <small>({task.id})</small>
                      </span>
                    </label>
                    <span className="controls">
                      <button
                        className="p-1 hover:bg-slate-200"
                        onClick={() => onEditClick(task)}
                      >
                        ✏
                      </button>
                      <button
                        className="p-1 hover:bg-slate-200"
                        onClick={() => onRemoveClick(task)}
                      >
                        🗑️
                      </button>
                    </span>
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
                    className={`${index + 1 === length && "bg-slate-100"}`}
                    key={history.id}
                  >
                    {history.action} {JSON.stringify(history.input)}
                  </li>
                ))}
                {redoHistory.map((history) => (
                  <li className="text-gray-400" key={history.id}>
                    {history.action} {JSON.stringify(history.input)}
                  </li>
                ))}
              </ul>
            </VStack>
          </div>
        </VStack>
      </Container>
    </div>
  );
}
