import { useDispatch } from "react-redux";
import { ActionCreators } from "redux-undo";
import { useHistories } from "../../lib/history/appHistoryHooks";
import { HStack } from "../../lib/layout/HStack";
import { VStack } from "../../lib/layout/VStack";
import { Button } from "../../lib/style/Button";
import { H2 } from "../../lib/style/H2";
import { TasksPageHistory } from "./store/TasksPageHistory";

export function HistorySection(): JSX.Element {
  const dispatch = useDispatch();
  const [pastHistories, presentHistory, futureHistories] =
    useHistories<TasksPageHistory>();

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
