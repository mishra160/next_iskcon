import React, { useState, useEffect } from "react";
// react-icons
import { FaGoogle } from "react-icons/fa";
import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
// public images
import iskcon_logo from "../../public/iskcon_logo.png";
// next
import Image from "next/image";
import { useRouter } from "next/router";
// firebase
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

// toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DashboardLogin = () => {
  // router
  const router = useRouter();
  // state
  const [state, setState] = useState({
    email: "",
    password: "",
    error: false,
  });
  const [admin, setadmin] = useState(null);

  const { email, password, error } = state;
  //   handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };
  // firebase loginUpdate
  const adminloginStatus = () => {
    updateDoc(doc(db, "admin", "O53nRl1MtNY1XhdhwXUB"), {
      adminLog: true,
    });
  };
  //   handleSignin
  const handleSignin = (e) => {
    let emailID = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    let passwordID = process.env.NEXT_PUBLIC_ADMIN_PASS;

    e.preventDefault();
    if (email == emailID && password == passwordID) {
      adminloginStatus();
      toast.success("LOGGED IN ", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      router.push("/dashboard");
    } else {
      setState({
        ...state,
        error: true,
      });
      toast.error("EMAIL OR PASSWORD DONT MATCH", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const fetcher = (id) => {
    const unsub = onSnapshot(doc(db, "admin", id), (doc) => {
      setadmin(doc.data());
    });
  };

  useEffect(() => {
    fetcher("O53nRl1MtNY1XhdhwXUB");
  }, []);

  return (
    <>
      <main className="flex  mx-auto bg-gray-200 h-[100vh] justify-center items-center">
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
        <div className="flex flex-col w-full items-center justify-center py-2">
          <div className="bg-white rounded-2xl shadow-2xl flex w-full  max-w-4xl text-center ">
            {/* Left Section */}
            <div className="w-full  p-5">
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
                  ADMIN LOGIN
                </h1>
                <div className="border-2 border-green-500 w-[90px] inline-block mb-2" />
              </div>
              {/* input fields */}
              <div className="flex flex-col items-center">
                <div className="bg-gray-200 w-64 p-2 flex items-center rounded-md mb-3 ">
                  <FaRegEnvelope className="text-gray-400 mr-2" />
                  <input
                    type="email"
                    placeholder="email"
                    className="flex bg-gray-200 flex-1 py-1 outline-none"
                    value={state.email}
                    onChange={handleChange}
                    name="email"
                    required
                  />
                </div>
                <div className="bg-gray-200 w-64 p-2 flex items-center rounded-md mb-1">
                  <MdLockOutline className="text-gray-400 mr-2" />
                  <input
                    type="password"
                    placeholder="password"
                    className="flex bg-gray-200 flex-1 py-1 outline-none"
                    value={state.password}
                    onChange={handleChange}
                    name="password"
                    required
                  />
                </div>
                {error && (
                  <span className="text-red-500">
                    ** email or password do not match **
                  </span>
                )}
                {/* remember-section */}
                <button
                  type="submit"
                  className="border-2 text-green-500 border-green-500 px-12 py-2 mt-2 rounded-full inline-block font-semibold hover:bg-green-500 hover:text-white"
                  onClick={handleSignin}
                >
                  SignIn
                </button>
              </div>
            </div>
            {/* Lef-Section-end */}
          </div>
        </div>
      </main>
    </>
  );
};

export default DashboardLogin;
