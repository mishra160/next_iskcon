import React, { useEffect, useState } from "react";
// nextjs
import Head from "next/head";
import { useRouter } from "next/router";
// components
import Navbar from "@/components/Navbars.js";
import Footer from "@/components/Footer.js";

// firebase
import { auth } from "../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const Layout = ({ title, keywords, description, children }) => {
  // router
  const router = useRouter();
  // useState
  const [user, setUser] = useState(null);
  // useEfffect
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, [user]);
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="descriptions" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <Navbar user={user} />
      <div className="container mx-auto">{children}</div>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "ISKCON || JANAKPUR",
  description: "iskcon temple janakpur",
  keywords: "iskcon,temple,krishna,radha,devotee",
};

export default Layout;
