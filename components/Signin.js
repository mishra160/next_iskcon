import React, { useState } from "react";
// next
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
// public images
import iskcon_logo from "../public/iskcon_logo.png";
// icons
import { FaGoogle } from "react-icons/fa";
import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
// firebase
import { auth } from "../firebase/firebaseConfig.js";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

// toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signin = () => {
  // state
  const [state, setState] = useState({
    email: "",
    password: "",
    error: "",
  });
  const { email, password, error } = state;

  // router
  const router = useRouter();
  // handleSignin
  const handleSignin = async (e) => {
    e.preventDefault();

    try {
      if (email && password) {
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
      } else {
        toast.warn("All FIELDS MANDATORY", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
      const users = auth.currentUser;
      if (users.emailVerified) {
        // success toast
        toast.success("SUCCESS", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        router.push("/");
      } else {
        // ERROR
        // not verified toast
        toast.warn("EMAIL NOT VERIFIED", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        signOut(auth);
        router.push("/signin");
      }
    } catch (error) {
      // error toast
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  // handleChange
  const handleChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <>
      <div className="container mx-auto  h-auto ">
        {/* Toast Notification */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <ToastContainer />
        {/* // toast notification */}
        <div className="flex flex-col items-center justify-center py-2 mx-auto ">
          <div className="rounded-2xl shadow-2xl flex w-full max-w-3xl  text-center bg-gray-300  ">
            {/* Left Section */}
            <div className="w-full p-5">
              <div className="flex">
                <Image
                  src={iskcon_logo}
                  width="40px"
                  height="40px"
                  alt="iskcon_logo"
                  className="rounded-xl"
                />
                <h1 className=" text-3xl font-black text-green-500 mt-[3px] ml-2">
                  ISKCON
                </h1>
              </div>
              <div className="pt-10">
                <h1 className="font-bold text-3xl text-gray-700 mb-1">
                  Sign In Your Account
                </h1>
                <div className="border-2 border-green-500 w-[90px] inline-block mb-2" />
              </div>
              {/* input fields */}
              <div className="flex flex-col items-center justify-center">
                <div className="bg-white w-64 p-2 flex items-center justify-center rounded-md mb-3 ">
                  <FaRegEnvelope className="text-gray-400 mr-2" />
                  <input
                    type="email"
                    placeholder="Email"
                    className="flex bg-white flex-1 py-1 outline-none"
                    value={email}
                    onChange={handleChange}
                    name="email"
                    required
                  />
                </div>
                <div className="bg-white w-64 p-2 flex items-center rounded-md mb-[5px]">
                  <MdLockOutline className="text-gray-400 mr-2" />
                  <input
                    type="password"
                    placeholder="Password"
                    className="flex bg-white flex-1 py-1 outline-none"
                    value={password}
                    onChange={handleChange}
                    name="password"
                    required
                  />
                </div>
                {/* remember-section */}
                <div className="flex w-64  cursor-pointer ml-[260px]">
                  <Link href="/resetpassword">
                    <a className="text-gray-500 font-light hover:underline">
                      Forgot Password?
                    </a>
                  </Link>
                </div>
                <button
                  type="submit"
                  className="border-2 text-green-500 border-green-500 px-12 py-2 rounded-full inline-block font-semibold hover:bg-green-500 hover:text-white"
                  onClick={handleSignin}
                >
                  SIGN IN
                </button>
                <Link href="/signup">
                  <p className=" text-gray-500 font-semibold my-2 ">
                    No Account Yet?
                    <span className="text-green-500 ml-2 cursor-pointer font-bold hover:underline">
                      SignUp
                    </span>
                  </p>
                </Link>
              </div>
            </div>
            {/* Lef-Section-end */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
