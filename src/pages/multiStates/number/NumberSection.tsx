import { ChangeEventHandler } from "react";
import { useDispatch } from "react-redux";
import { VStack } from "../../../lib/layout/VStack";
import { Button } from "../../../lib/style/Button";
import { H2 } from "../../../lib/style/H2";
import { numberActions } from "./numberSlice";
import { useNumber } from "./numberStateHooks";

export function NumberSection(): JSX.Element {
  const dispatch = useDispatch();
  const number = useNumber();

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
