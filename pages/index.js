import Head from "next/head";
import Layout from "@/components/Layout.js";
import Home from "@/components/Home.js";

export default function index() {
  return (
    <>
      <Layout>
        <Home />
      </Layout>
    </>
  );
}
