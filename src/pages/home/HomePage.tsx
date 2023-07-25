import Head from "next/head";

export function HomePage(): JSX.Element {
  return (
    <div className="HomePage">
      <Head>
        <title>History system</title>
        <link rel="icon" href="/icon-512.png" />
      </Head>
      <h1>HomePage</h1>
    </div>
  );
}
