import { ChangeEventHandler, useState } from "react";
import { VStack } from "../../../lib/layout/VStack";
import { H2 } from "../../../lib/style/H2";
import { Button } from "../../../lib/style/Button";

export function NumberSection(): JSX.Element {
  const [number, setNumber] = useState(0);

  const onRangeChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = Number(event.currentTarget.value);
    setNumber(value);
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
        <Button onClick={() => setNumber(number - 10)}>-10</Button>
        <Button onClick={() => setNumber(number - 1)}>-1</Button>
        <Button onClick={() => setNumber(number + 1)}>+1</Button>
        <Button onClick={() => setNumber(number + 10)}>+10</Button>
      </div>
    </VStack>
  );
}
