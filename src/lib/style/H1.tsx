import { ReactNode } from "react";

export function H1({ children }: { children: ReactNode }): JSX.Element {
  return <h1 className="text-3xl font-bold">{children}</h1>;
}
