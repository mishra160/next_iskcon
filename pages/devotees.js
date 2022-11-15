import React from "react";
import Devotees from "@/components/Devotees";

import Layout from "@/components/Layout";

// firebase funtions

const devotees = () => {
  return (
    <>
      <Layout>
        <Devotees />
      </Layout>
    </>
  );
};

export default devotees;
