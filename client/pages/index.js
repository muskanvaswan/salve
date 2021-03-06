import React from "react";
import Banner from "../src/components/index/Banner.js";
import Layout from "../src/components/Layout";
import Footer from "../src/components/Footer";

export default function Home() {
  return (
    <React.Fragment>
      <Layout noFooter subtitle="Home">
        <div className="flex flex-col justify-between h-screen ">
          <main className="flex flex-col items-center justify-center flex-grow space-y-5">
            <Banner />
          </main>
          <Footer />
        </div>
      </Layout>
    </React.Fragment>
  );
}
