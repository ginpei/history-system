import Head from "next/head";
import { Container } from "../../lib/layout/Container";
import { VStack } from "../../lib/layout/VStack";
import { A } from "../../lib/style/A";
import { H1 } from "../../lib/style/H1";

export function MultiStatesPage(): JSX.Element {
  return (
    <div className="my-4">
      <Head>
        <title>Multi states</title>
        <link rel="icon" href="/icon-512.png" />
      </Head>
      <Container>
        <VStack>
          <H1>Multi states</H1>
        </VStack>
      </Container>
    </div>
  );
}
