import { ReactNode } from "react";

export function HStack({ children }: { children: ReactNode }): JSX.Element {
  return <div className="HStack flex gap-4">{children}</div>;
}
