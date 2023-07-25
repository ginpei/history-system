import Link from "next/link";
import { ComponentPropsWithRef } from "react";

type AProps = Pick<
  ComponentPropsWithRef<"a">,
  "children" | "href" | "target"
> & {
  href: string;
};

export function A(props: AProps): JSX.Element {
  return (
    <Link
      className="underline text-blue-700 hover:text-red-500 focus:text-red-500"
      {...props}
    />
  );
}
