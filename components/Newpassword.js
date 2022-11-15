import React, { useState } from "react";
// public images
import iskcon_logo from "../public/iskcon_logo.png";
// next
import Image from "next/image";
import { useRouter } from "next/router";
// firebase
import { confirmPasswordReset } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
// toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewPassword = () => {
  // useRouter
  const router = useRouter();
  const pid = router.query;

  // state
  const [Password, setPassword] = useState("");
  // handleReset
  const handleReset = async (e) => {
    e.preventDefault();
    const oobCode = pid.oobCode;
    await confirmPasswordReset(auth, oobCode, Password)
      .then(() => {
        // Password reset email sent!
        toast.success("Reset Success", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        router.push("/signin");
      })
      .catch((error) => {
        const errorMessage = error.message;

        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
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
      <div className="container mx-auto bg-gray-200">
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
        <div className="flex flex-col items-center justify-center mb-2 w-full h-[68vh]">
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
          <form className="bg-white p-5 rounded-lg">
            <h1 className="font-bold text-center text-2xl mb-3">
              RESET PASSWORD
            </h1>
            <label className="block">
              <span className="block text-md font-bold text-slate-700">
                New Password
              </span>
              <input
                type="password"
                className="py-2 w-64 bg-gray-200  mr-2 rounded-lg p-2 "
                value={Password}
                name="Password"
                placeholder="New Passsword"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                className="px-3 py-2 bg-green-400 hover:bg-green-500 font-bold rounded-lg text-white border-2  "
                onClick={handleReset}
              >
                SUBMIT
              </button>
            </label>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewPassword;
