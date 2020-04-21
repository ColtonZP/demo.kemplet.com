import React from "react";
import AppIndex from "../components/app/AppIndex";

import Head from "next/head";
import "../styles/app/index.scss";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Kemplet App</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main>
        <AppIndex />
      </main>
    </div>
  );
}
