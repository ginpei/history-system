import Head from "next/head";
import { Container } from "../../lib/layout/Container";
import { VStack } from "../../lib/layout/VStack";
import { A } from "../../lib/style/A";
import { H1 } from "../../lib/style/H1";

export function HomePage(): JSX.Element {
  return (
    <div className="my-4">
      <Head>
        <title>History system</title>
        <link rel="icon" href="/icon-512.png" />
      </Head>
      <Container>
        <VStack>
          <H1>History system</H1>
          <p>
            <A href="/multiStates">Multi states</A>
          </p>
          <p>
            <A href="/tasks">Tasks</A>
          </p>
          <p>
            <A href="/singleFile">Single file example</A>
          </p>
        </VStack>
      </Container>
    </div>
  );
}
