import React, { useEffect, useState } from "react";
// next
import Image from "next/image";
import Link from "next/link";
// public image
import iskcon_logo from "../public/iskcon_logo.png";
import Layout from "@/components/Layout";

// firebase
import { sendEmailVerification, signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
const Verification = () => {
  //   state
  const [email, setEmail] = useState(null);
  //   useState
  useEffect(() => {
    try {
      const user = auth.currentUser;
      setEmail(user.email);
      sendEmailVerification(user);
      signOut(auth);
    } catch (error) {
      alert(error.message);
    }
  }, []);

  return (
    <>
      <div className="container mx-auto bg-gray-200">
        <div className="flex flex-col items-center justify-center mb-2 w-full h-[68vh]">
          <Image
            src={iskcon_logo}
            width="40px"
            height="40px"
            alt="iskcon_logo"
            className="rounded-xl"
          />
          <h1 className=" text-3xl font-black text-green-500 mt-[3px] ml-2 mb-2">
            ISKCON
          </h1>
          <form className="bg-white p-5 mx-3 rounded-lg">
            <h1 className="font-bold text-center text-2xl mb-3 font-mono">
              A VERIFICATION EMAIL HAS BEEN SENT TO EMAIL ADDRESS:- {email}{" "}
              PLEASE CHECK YOUR EMAIL TO VERIFY
            </h1>
          </form>
          <Link href="/">
            <button className=" w-64 p-3 bg-green-500 text-white rounded-lg mt-2">
              Go Home
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Verification;
