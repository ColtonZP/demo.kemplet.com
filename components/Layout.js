import React from "react";
import Head from "next/head";

import "../styles/index.scss";
import Nav from "./nav";

const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Kemplet</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
