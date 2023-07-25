import Head from "next/head";
import { H1 } from "../../lib/style/H1";

export function HomePage(): JSX.Element {
  return (
    <div className="HomePage">
      <Head>
        <title>History system</title>
        <link rel="icon" href="/icon-512.png" />
      </Head>
      <H1>HomePage</H1>
    </div>
  );
}
