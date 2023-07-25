import { ReactNode } from "react";

export function VStack({ children }: { children: ReactNode }): JSX.Element {
  return <div className="VStack flex flex-col gap-4">{children}</div>;
}
