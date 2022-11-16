import React, { useState, useEffect } from "react";
// nextjs
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
// react-icons
import { FaBars } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";
import { BsPersonCircle } from "react-icons/bs";
// public images
import iskcon_logo from "../public/iskcon_logo.png";

//firebase
// firebase
import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";

// toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbars = ({ user }) => {
  // router
  const router = useRouter();

  // useState
  const [nav, setNav] = useState(false);
  const [verify, setverify] = useState(null);

  useEffect(() => {
    if (user !== null) {
      const verified = user.emailVerified;
      setverify(verified);
    }
  }, [user]);

  // handlelogout
  const handleLogout = async (e) => {
    e.preventDefault();
    signOut(auth)
      .then(() => {
        // success toast
        toast.success("LOGGED OUT", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        router.push("/signin");
      })
      .catch((error) => {
        // success toast
        toast.error(error.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };

  return (
    <>
      <header className=" flex  container mx-auto  bg-black text-white py-3  mb-1">
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
        <div className=" flex">
          <Link href="/">
            <div className=" flex cursor-pointer my-auto m-2">
              <div className="mx-2 mt-1  md:h-{80} ">
                <Image
                  src={iskcon_logo}
                  width={90}
                  height={80}
                  alt="iskcon_logo"
                  className="rounded-xl"
                />
              </div>
              <h1 className="hidden md:flex text-3xl cursor-pointer font-black mx-2 my-auto text-green-400 ">
                ISK-CON
              </h1>
            </div>
          </Link>
        </div>
        {/* lists in navbar in md screen */}
        <ul className=" flex w-full sm:px-6 lg:px-8">
          <div className=" flex ml-auto my-auto">
            <div className="hidden md:flex text-green-400 text-xl font-bold">
              <Link href="/contact">
                <li className="cursor-pointer mx-4 px-1 pt-[5px] hover:scale-110">
                  Contact
                </li>
              </Link>

              <Link href="/devotees">
                <li className="cursor-pointer mx-4 px-1 pt-[5px] hover:scale-110">
                  Devotees
                </li>
              </Link>
              <Link href="/events">
                <li className="cursor-pointer mx-4 px-1 pt-[5px] hover:scale-110">
                  Events
                </li>
              </Link>
              <li className="cursor-pointer mx-4 px-1 hover:scale-105">
                {!verify ? (
                  <Link href="/signin">
                    <button className="bg-green-500 text-white p-[5px] rounded-lg ">
                      LOGIN
                    </button>
                  </Link>
                ) : (
                  <button
                    className="bg-red-500 text-white p-[5px] rounded-lg "
                    onClick={handleLogout}
                  >
                    LOGOUT
                  </button>
                )}
              </li>
            </div>
          </div>
        </ul>
        <div
          className="ml-auto md:hidden sm:flex my-auto cursor-pointer px-2 z-20"
          onClick={() => setNav(!nav)}
        >
          {nav ? (
            <MdClose size={30} className=" text-green-500 " />
          ) : (
            <FaBars size={30} className=" text-green-500 " />
          )}
        </div>
        {/* lists in navbar in sm screen */}
        <ul
          className={`flex z-10 w-full h-full md:hidden lg:hidden flex-col absolute top-0 left-0 justify-center items-center bg-gradient-to-b from from-black to to-gray-800 text-gray-300 ${
            nav ? "block" : "hidden"
          }`}
        >
          <div className="flex flex-col justify-center items-center text-2xl">
            <li className=" text-green-500 font-semi-bold cursor-pointer my-5 hover:scale-110">
              {!user ? (
                <Link href="/signin">
                  <button className="bg-green-500 text-white px-2 py-[5px] rounded-lg ">
                    LOGIN
                  </button>
                </Link>
              ) : (
                <button
                  className="bg-red-500 text-white p-2 rounded-lg "
                  onClick={handleLogout}
                >
                  LOGOUT
                </button>
              )}
            </li>
            <Link href="/contact">
              <li className=" text-green-500 font-semi-bold cursor-pointer my-5  hover:scale-110">
                Contact
              </li>
            </Link>
            <Link href="/devotees">
              <li className=" text-green-500 font-semi-bold cursor-pointer my-5  hover:scale-110">
                Devotees
              </li>
            </Link>
            <Link href="/events">
              <li className=" text-green-500 font-semi-bold cursor-pointer my-5  hover:scale-110">
                Events
              </li>
            </Link>
          </div>
        </ul>
      </header>
    </>
  );
};

export default Navbars;
