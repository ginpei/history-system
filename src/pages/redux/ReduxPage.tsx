import Head from "next/head";
import { useDispatch } from "react-redux";
import { ActionCreators } from "redux-undo";
import { Container } from "../../lib/layout/Container";
import { HStack } from "../../lib/layout/HStack";
import { VStack } from "../../lib/layout/VStack";
import { A } from "../../lib/style/A";
import { Button } from "../../lib/style/Button";
import { H1 } from "../../lib/style/H1";
import { H2 } from "../../lib/style/H2";
import { Task, buildTask } from "../../lib/task/Task";
import { findTask } from "../../lib/task/taskArrayManipulators";
import {
  ReduxPageStateProvider,
  taskActions,
  useHasHistories,
  useHistories,
  useTasks,
} from "./store/reduxPageStore";

export function ReduxPage(): JSX.Element {
  return (
    <div className="my-4">
      <Head>
        <title>History by Redux</title>
        <link rel="icon" href="/icon-512.png" />
      </Head>
      <ReduxPageStateProvider>
        <Container>
          <VStack>
            <H1>History by Redux</H1>
            <p>
              <A href="/">Home</A>
            </p>
            <TaskDashboard />
          </VStack>
        </Container>
      </ReduxPageStateProvider>
    </div>
  );
}

function TaskDashboard() {
  const tasks = useTasks();
  const dispatch = useDispatch();
  const [hasPast, hasFuture] = useHasHistories();
  const [pastHistories, presentHistory, futureHistories] = useHistories();

  const onAddTaskClick = () => {
    const title = window.prompt("Task title");
    if (title === null) {
      return;
    }

    const task = buildTask({ title });
    dispatch(taskActions.add(task));
  };

  const onTaskDoneChange = (taskId: string, done: boolean) => {
    const task = findTask(tasks, taskId);
    dispatch(taskActions.update({ ...task, done }));
  };

  const onEditClick = (taskId: string) => {
    const task = findTask(tasks, taskId);

    const title = window.prompt("Task title", task.title);
    if (title === null || title === task.title) {
      return;
    }

    dispatch(taskActions.update({ ...task, title }));
  };

  const onRemoveClick = (task: Task) => {
    const ok = window.confirm(`Remove this task: "${task.title}"`);
    if (!ok) {
      return;
    }

    dispatch(taskActions.remove({ id: task.id }));
  };

  const onUndoClick = () => {
    dispatch(ActionCreators.undo());
  };

  const onRedoClick = () => {
    dispatch(ActionCreators.redo());
  };

  return (
    <div className="flex gap-8 [&>*]:w-1/2">
      <VStack>
        <H2>Tasks</H2>
        <HStack>
          <Button onClick={onAddTaskClick}>Add task...</Button>
          <Button onClick={() => console.log(tasks)}>Log</Button>
        </HStack>
        <ul>
          {tasks.map((task) => (
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
                  onClick={() => onEditClick(task.id)}
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
          <Button disabled={!hasPast} onClick={onUndoClick}>
            ← Undo
          </Button>
          <Button disabled={!hasFuture} onClick={onRedoClick}>
            Redo →
          </Button>
        </HStack>
        <ul className="[&>*]:border-t">
          {pastHistories.map((history) => (
            <li key={history.id}>{history.title}</li>
          ))}
          <li className="bg-slate-100" key={presentHistory.id}>
            {presentHistory.title}
          </li>
          {futureHistories.map((history) => (
            <li className="text-gray-400" key={history.id}>
              {history.title}
            </li>
          ))}
        </ul>
      </VStack>
    </div>
  );
}
