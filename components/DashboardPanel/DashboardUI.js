import React, { useEffect, useState } from "react";
// public images
import iskcon_logo from "../../public/iskcon_logo.png";
// next
import Image from "next/image";
import { useRouter } from "next/router";
// components
import DashboardEvents from "@/components/DashboardPanel/Events";
import DashboardFeatureimage from "@/components/DashboardPanel/FeaturedImages";
import Sidebar from "@/components/DashboardPanel/Sidebar";
// firebase
// firebase
import { collection, query, onSnapshot, doc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
const DashboardUI = () => {
  // router
  const router = useRouter();

  //useState
  const [loggedin, setLoggedin] = useState();

  const fetcher = (id) => {
    const unsub = onSnapshot(doc(db, "admin", id), (doc) => {
      setLoggedin(doc.data().adminLog);
    });
  };

  // useEffect
  useEffect(() => {
    fetcher("O53nRl1MtNY1XhdhwXUB");
  }, []);

  // handleRoute
  const handleRoute = (e) => {
    e.preventDefault();
    router.push("/dashboard/admin_login");
  };

  return (
    <>
      {loggedin ? (
        <div>
          <Sidebar />
          <main className="w-4/5 h-auto ml-auto bg-gray-200">
            <DashboardFeatureimage />
            <DashboardEvents />
          </main>
        </div>
      ) : (
        <div className="w-full  bg-gray-200 h-[100vh] flex flex-col">
          <h1 className="mx-auto text-4xl font-bold mt-[100px] mb-5">
            You Are not logged in as Admin
          </h1>
          <button
            className=" mx-auto w-2/3 px-6 py-2 bg-green-500 text-white rounded-lg "
            onClick={handleRoute}
          >
            Login
          </button>
        </div>
      )}
    </>
  );
};

export default DashboardUI;
