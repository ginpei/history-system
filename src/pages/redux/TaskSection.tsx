import { useDispatch } from "react-redux";
import { HStack } from "../../lib/layout/HStack";
import { VStack } from "../../lib/layout/VStack";
import { Button } from "../../lib/style/Button";
import { H2 } from "../../lib/style/H2";
import { buildTask, Task } from "../../lib/task/Task";
import { findTask } from "../../lib/task/taskArrayManipulators";
import { taskActions, useTasks } from "./store/reduxPageStore";

export function TaskSection(): JSX.Element {
  const tasks = useTasks();
  const dispatch = useDispatch();

  const onAddTaskClick = () => {
    const title = window.prompt("Task title");
    if (title === null) {
      return;
    }

    const task = buildTask({ title });
    dispatch(taskActions.add(task));
  };

  return (
    <VStack>
      <H2>Tasks</H2>
      <HStack>
        <Button onClick={onAddTaskClick}>Add task...</Button>
        <Button onClick={() => console.log(tasks)}>Log</Button>
      </HStack>
      <ul>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} tasks={tasks} />
        ))}
      </ul>
    </VStack>
  );
}

interface TaskItemProps {
  task: Task;
  tasks: Task[];
}

function TaskItem({ task, tasks }: TaskItemProps): JSX.Element {
  const dispatch = useDispatch();

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

  return (
    <li
      className="
        flex gap-4
        hover:bg-slate-50
        [&>.controls]:invisible
        [&:hover>.controls]:visible
      "
    >
      <label className="flex flex-1 gap-1 items-baseline hover:underline">
        <input
          checked={task.done}
          onChange={() => onTaskDoneChange(task.id, !task.done)}
          type="checkbox"
        />
        <span>{task.title}</span>
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
  );
}
