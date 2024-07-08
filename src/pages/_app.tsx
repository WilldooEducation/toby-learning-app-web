import "@/styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@material-tailwind/react";
import { Open_Sans } from "next/font/google";
import GlobalContext from "../utils/global-context";
import blockData from "@/block-data.json";
import { useState } from "react";

const openSans = Open_Sans({
  weight: "400",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  const [state, setState] = useState({
    data: blockData,
    update
  });

  function update(data: any) {
    setState(Object.assign({}, state, data));
  }
  return (
    <GlobalContext.Provider value={state}>
      <ThemeProvider>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
        </Head>
        <main
          className={openSans.className}
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <Component {...pageProps} className={openSans.className} />
        </main>
      </ThemeProvider>
    </GlobalContext.Provider>
  );
}
