import { useDispatch, useSelector } from "react-redux";
import { ActionCreators } from "redux-undo";
import { HStack } from "../../lib/layout/HStack";
import { VStack } from "../../lib/layout/VStack";
import { Button } from "../../lib/style/Button";
import { H2 } from "../../lib/style/H2";
import { TasksPageStoreState } from "./store/TasksPageStoreState";
import { TasksState } from "./store/tasks/TasksState";

export function HistorySection(): JSX.Element {
  const dispatch = useDispatch();
  const [pastHistories, presentHistory, futureHistories] = useHistories();

  const onUndoClick = () => {
    dispatch(ActionCreators.undo());
  };

  const onRedoClick = () => {
    dispatch(ActionCreators.redo());
  };

  return (
    <VStack>
      <H2>History</H2>
      <HStack>
        <Button disabled={pastHistories.length < 1} onClick={onUndoClick}>
          ← Undo
        </Button>
        <Button disabled={futureHistories.length < 1} onClick={onRedoClick}>
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
  );
}

// TODO extract
function useHistories(): [TasksState[], TasksState, TasksState[]] {
  return useSelector(
    (v: TasksPageStoreState): [TasksState[], TasksState, TasksState[]] => [
      v.tasks.past,
      v.tasks.present,
      v.tasks.future,
    ],
    (a, b) => a[0] === b[0] && a[1] === b[1] && a[2] === b[2],
  );
}
