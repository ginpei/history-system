import Head from "next/head";
import { Container } from "../../lib/layout/Container";
import { VStack } from "../../lib/layout/VStack";
import { A } from "../../lib/style/A";
import { H1 } from "../../lib/style/H1";
import { HistorySection } from "./HistorySection";
import { TaskSection } from "./TaskSection";
import { ReduxPageStateProvider } from "./store/reduxPageStore";

export function TasksPage(): JSX.Element {
  return (
    <ReduxPageStateProvider>
      <div className="my-4">
        <Head>
          <title>Tasks with history system</title>
          <link rel="icon" href="/icon-512.png" />
        </Head>
        <Container>
          <VStack>
            <H1>Tasks with history system</H1>
            <p>
              <A href="/">Home</A>
            </p>
            <div className="flex gap-8 [&>*]:w-1/2">
              <TaskSection />
              <HistorySection />
            </div>
          </VStack>
        </Container>
      </div>
    </ReduxPageStateProvider>
  );
}
