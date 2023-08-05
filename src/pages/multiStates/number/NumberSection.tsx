import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { HStack } from "../../../lib/layout/HStack";
import { VStack } from "../../../lib/layout/VStack";
import { Button } from "../../../lib/style/Button";
import { H2 } from "../../../lib/style/H2";
import {
  numberActions,
  numberRedoAction,
  numberUndoAction,
} from "./numberSlice";
import { useNumber, useNumberHistories } from "./numberStateHooks";

export function NumberSection(): JSX.Element {
  const dispatch = useDispatch();
  const number = useNumber();
  const [diff, setDiff] = useState(0);
  const [pastHistories, presentHistory, futureHistories] = useNumberHistories();
  const refRange = useRef<HTMLInputElement>(null);

  const curNumber = number + diff;

  useEffect(() => {
    const el = refRange.current;
    const f = () => {
      setDiff(0);
      dispatch(numberActions.set(curNumber));
    };

    el?.addEventListener("change", f);
    return () => el?.removeEventListener("change", f);
  }, [curNumber, dispatch]);

  const onUndoClick = () => {
    dispatch(numberUndoAction);
  };

  const onRedoClick = () => {
    dispatch(numberRedoAction);
  };

  const onRangeChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = Number(event.currentTarget.value);
    setDiff(value - number);
  };

  const addNumber = (amount: number) => {
    dispatch(numberActions.add(amount));
  };

  return (
    <VStack>
      <H2>Number</H2>
      <HStack>
        <Button disabled={pastHistories.length < 1} onClick={onUndoClick}>
          ← Undo
        </Button>
        <Button disabled={futureHistories.length < 1} onClick={onRedoClick}>
          Redo →
        </Button>
      </HStack>
      <div className="flex flex-wrap gap-2">
        {pastHistories.map((history) => (
          <span key={history.id}>{history.title}</span>
        ))}
        <span className="underline">{presentHistory.title}</span>
        {futureHistories.map((history) => (
          <span className="text-gray-400" key={history.id}>
            {history.title}
          </span>
        ))}
      </div>
      <p>
        <code>Number: {curNumber}</code>
      </p>
      <input
        max="100"
        min="-100"
        onChange={onRangeChange}
        ref={refRange}
        step="1"
        type="range"
        value={curNumber}
      />
      <div className="flex mx-auto max-w-screen-sm gap-4 [&>*]:flex-grow">
        <Button onClick={() => addNumber(-10)}>-10</Button>
        <Button onClick={() => addNumber(-1)}>-1</Button>
        <Button onClick={() => addNumber(+1)}>+1</Button>
        <Button onClick={() => addNumber(+10)}>+10</Button>
      </div>
    </VStack>
  );
}
