import React from "react";
import iskcon_logo from "../../public/iskcon_logo.png";
// next
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
// firebase
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

// toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Sidebar = () => {
  // router
  const router = useRouter();
  // firebase adminloginStatus
  // firebase loginUpdate
  const adminloginStatus = () => {
    updateDoc(doc(db, "admin", "O53nRl1MtNY1XhdhwXUB"), {
      adminLog: false,
    });
  };
  // handleSignout
  const handleSignout = () => {
    toast.success("LOGGED OUT ", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

    router.push("/dashboard/admin_login");
    adminloginStatus();
  };

  return (
    <>
      <main className="top-0 left-0 fixed bg-black text-white w-1/5 h-full ">
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
        <div className=" flex cursor-pointer my-auto m-2">
          <div className="mx-2 mt-2  md:h-{80} ">
            <Image
              src={iskcon_logo}
              width={60}
              height={50}
              alt="iskcon_logo"
              className="rounded-xl"
            />
          </div>
          <h1 className=" md:flex text-3xl cursor-pointer font-black mx-2 my-auto text-green-400 ">
            ISKCON
          </h1>
        </div>
        <hr className="mt-2" />
        <Link href="#featuredimages">
          <div className="bg-gray-500 hover:bg-green-500 cursor-pointer my-1">
            <h1 className="text-2xl p-2 text-center ">FEATURED_IMAGES</h1>
          </div>
        </Link>
        <Link href="#events">
          <div className="bg-gray-500 hover:bg-green-500 cursor-pointer my-1">
            <h1 className="text-2xl p-2 text-center ">EVENTS</h1>
          </div>
        </Link>
        <div
          className="bg-gray-500 hover:bg-green-500 cursor-pointer my-1"
          onClick={handleSignout}
        >
          <h1 className="text-2xl p-2 text-center ">LOGOUT</h1>
        </div>
      </main>
    </>
  );
};

export default Sidebar;
