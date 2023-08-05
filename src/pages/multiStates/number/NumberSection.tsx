import { ChangeEventHandler } from "react";
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
import { useNumber } from "./numberStateHooks";

export function NumberSection(): JSX.Element {
  const dispatch = useDispatch();
  const number = useNumber();

  const onUndoClick = () => {
    dispatch(numberUndoAction);
  };

  const onRedoClick = () => {
    dispatch(numberRedoAction);
  };

  const onRangeChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = Number(event.currentTarget.value);
    dispatch(numberActions.set(value));
  };

  const addNumber = (amount: number) => {
    dispatch(numberActions.add(amount));
  };

  return (
    <VStack>
      <H2>Number</H2>
      <HStack>
        <Button onClick={onUndoClick}>← Undo</Button>
        <Button onClick={onRedoClick}>Redo →</Button>
      </HStack>
      <p>
        <code>Number: {number}</code>
      </p>
      <input
        max="100"
        min="-100"
        onChange={onRangeChange}
        step="1"
        type="range"
        value={number}
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
