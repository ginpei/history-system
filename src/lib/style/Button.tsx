import { ComponentPropsWithRef } from "react";

type ButtonProps = Pick<
  ComponentPropsWithRef<"button">,
  "children" | "disabled" | "onClick"
>;
export function Button(props: ButtonProps): JSX.Element {
  return (
    <button
      className="
        border px-4 h-8
        bg-slate-100
        hover:bg-slate-200
        disabled:bg-gray-300 disabled:text-gray-500
      "
      {...props}
    />
  );
}
