import { ChangeEventHandler, useState } from "react";
import { VStack } from "../../../lib/layout/VStack";
import { H2 } from "../../../lib/style/H2";

type Option = (typeof options)[number];

const options = ["black", "blue", "green", "red", "white"] as const;

export function EnumSection(): JSX.Element {
  const [backgroundColor, setBackgroundColor] = useState<Option>("white");
  const [color, setColor] = useState<Option>("black");

  return (
    <VStack>
      <H2>Enum</H2>
      <ColorSelect
        color={color}
        label="Text"
        name="fgColor"
        onChange={setColor}
      />
      <ColorSelect
        color={backgroundColor}
        label="Background"
        name="bgColor"
        onChange={setBackgroundColor}
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
