export interface ContainerProps {
  children: React.ReactNode;
}

export function Container({ children }: ContainerProps): JSX.Element {
  return (
    <div className="mx-auto min-x-[320px] max-w-[60rem] px-4">{children}</div>
  );
}
