import Head from "next/head";
import { Container } from "../../lib/layout/Container";
import { VStack } from "../../lib/layout/VStack";
import { A } from "../../lib/style/A";
import { H1 } from "../../lib/style/H1";

export function CountersPage(): JSX.Element {
  return (
    <div className="my-4">
      <Head>
        <title>Counters</title>
        <link rel="icon" href="/icon-512.png" />
      </Head>
      <Container>
        <VStack>
          <H1>Counters</H1>
        </VStack>
      </Container>
    </div>
  );
}
