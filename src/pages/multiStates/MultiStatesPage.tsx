import Head from "next/head";
import { Provider } from "react-redux";
import { Container } from "../../lib/layout/Container";
import { H1 } from "../../lib/style/H1";
import { EnumSection } from "./enum/EnumSection";
import { NumberSection } from "./number/NumberSection";
import { multiStatesPageStore } from "./store/multiStatesPageStore";

export function MultiStatesPage(): JSX.Element {
  return (
    <Provider store={multiStatesPageStore}>
      <div className="my-4">
        <Head>
          <title>Multi states</title>
          <link rel="icon" href="/icon-512.png" />
        </Head>
        <Container>
          <div className="flex flex-col gap-16">
            <H1>Multi states</H1>
            <EnumSection />
            <NumberSection />
          </div>
        </Container>
      </div>
    </Provider>
  );
}
