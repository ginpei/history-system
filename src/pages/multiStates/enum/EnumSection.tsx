import { ChangeEventHandler } from "react";
import { useDispatch } from "react-redux";
import { HStack } from "../../../lib/layout/HStack";
import { VStack } from "../../../lib/layout/VStack";
import { Button } from "../../../lib/style/Button";
import { H2 } from "../../../lib/style/H2";
import { ColorOption } from "./EnumState";
import { enumActions, enumRedoAction, enumUndoAction } from "./enumSlice";
import {
  useBackgroundColor,
  useColor,
  useEnumHistories,
} from "./enumStateHooks";

type Option = (typeof options)[number];

const options = ["black", "blue", "green", "red", "white"] as const;

export function EnumSection(): JSX.Element {
  const dispatch = useDispatch();
  const color = useColor();
  const backgroundColor = useBackgroundColor();
  const [pastHistories, presentHistory, futureHistories] = useEnumHistories();

  const onUndoClick = () => {
    dispatch(enumUndoAction);
  };

  const onRedoClick = () => {
    dispatch(enumRedoAction);
  };

  const onColorChange = (newColor: ColorOption) => {
    dispatch(enumActions.setColor(newColor));
  };

  const onBackgroundColorChange = (newColor: ColorOption) => {
    dispatch(enumActions.setBackgroundColor(newColor));
  };

  return (
    <VStack>
      <H2>Enum</H2>
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
      <ColorSelect
        color={color}
        label="Text"
        name="fgColor"
        onChange={onColorChange}
      />
      <ColorSelect
        color={backgroundColor}
        label="Background"
        name="bgColor"
        onChange={onBackgroundColorChange}
      />
      <div
        className="border py-2 px-4 text-xl"
        style={{ backgroundColor, color }}
      >
        Preview
      </div>
    </VStack>
  );
}

interface ColorSelectProps {
  color: Option;
  label: string;
  name: string;
  onChange: (color: Option) => void;
}

function ColorSelect({
  color,
  label,
  name,
  onChange,
}: ColorSelectProps): JSX.Element {
  const onColorChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.currentTarget.value as Option;
    onChange(value);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <span className="xw-24 text-right">{label}:</span>
      {options.map((option) => (
        <label className="inline-flex px-2 gap-1" key={option}>
          <input
            checked={option === color}
            name={name}
            onChange={onColorChange}
            type="radio"
            value={option}
          />
          <span>{option}</span>
        </label>
      ))}
    </div>
  );
}
