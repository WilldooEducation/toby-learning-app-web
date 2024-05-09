import "@/styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@material-tailwind/react";
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({
  weight: "400",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <main className={openSans.className} style={{width: "100%", display: "flex", justifyContent: "center"}}>
        <Component {...pageProps} className={openSans.className} />
      </main>
    </ThemeProvider>
  );
}
