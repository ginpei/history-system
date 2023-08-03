import { ComponentPropsWithRef } from "react";

type CheckboxProps = Pick<
  ComponentPropsWithRef<"input">,
  "checked" | "disabled" | "name" | "onChange" | "value" | "children"
>;

export function Checkbox({ children, ...props }: CheckboxProps): JSX.Element {
  return (
    <label className="flex items-center gap-1">
      <input
        className="
          border px-4 h-8
          bg-slate-100
          hover:bg-slate-200
          disabled:bg-gray-300 disabled:text-gray-500
        "
        type="checkbox"
        {...props}
      />
      {children}
    </label>
  );
}
