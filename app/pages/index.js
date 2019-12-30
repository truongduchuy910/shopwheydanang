import React from "react";
import "../public/bootstrap/css/bootstrap.min.css";
import Head from "next/head";
import Nav from "../components/Nav";
import Banner from "../components/Banner";
import Review from "../components/Review";
import Project from "../components/Project";

export default function About() {
  return (
    <div>
      <Head>
        <title>Loa Loa Media</title>
      </Head>
      <Nav />
      <Banner />
      <Review />
      <Project />
    </div>
  );
}
