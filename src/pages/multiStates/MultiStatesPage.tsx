import Head from "next/head";
import { ChangeEventHandler } from "react";
import { Provider, useDispatch } from "react-redux";
import { Container } from "../../lib/layout/Container";
import { HStack } from "../../lib/layout/HStack";
import { H1 } from "../../lib/style/H1";
import { EnumSection } from "./enum/EnumSection";
import { NumberSection } from "./number/NumberSection";
import { useTheme } from "./pageState/pageStateHooks";
import { pageStateActions } from "./pageState/pageStateSlice";
import { multiStatesPageStore } from "./store/multiStatesPageStore";

export function MultiStatesPage(): JSX.Element {
  return (
    <Provider store={multiStatesPageStore}>
      <div className="my-4">
        <Head>
          <title>Multi states</title>
          <link rel="icon" href="/icon-512.png" />
        </Head>
        <PageStyle />
        <PageContent />
      </div>
    </Provider>
  );
}

function PageStyle(): JSX.Element {
  const theme = useTheme();
  return (
    <style className="PageStyle">{
      /*css*/ `
    body {
      background-color: ${theme === "light" ? "#f9f9f9" : "#336"};
      color: ${theme === "light" ? "black" : "white"};
    }
  `
    }</style>
  );
}

function PageContent(): JSX.Element {
  const dispatch = useDispatch();
  const theme = useTheme();

  const onThemeChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const theme = event.currentTarget.value;
    dispatch(pageStateActions.set(theme));
  };

  return (
    <Container>
      <div className="PageContent flex flex-col gap-16">
        <H1>Multi states</H1>
        <HStack>
          <label>
            <input
              checked={theme === "light"}
              name="theme"
              onChange={onThemeChange}
              type="radio"
              value="light"
            />
            Light
          </label>
          <label>
            <input
              checked={theme === "dark"}
              name="theme"
              onChange={onThemeChange}
              type="radio"
              value="dark"
            />
            Dark
          </label>
        </HStack>
        <EnumSection />
        <NumberSection />
      </div>
    </Container>
  );
}
