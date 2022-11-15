import React, { useState, useEffect, useRef } from "react";
// next
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
// logo
import iskcon_logo from "../public/iskcon_logo.png";
// icons
import { FaGoogle } from "react-icons/fa";
import { FaRegEnvelope } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";
import { BiUser } from "react-icons/bi";
import { MdLockOutline } from "react-icons/md";
import Layout from "@/components/Layout";

// uuid
import { v4 } from "uuid";

// toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// firebase
import { auth } from "../firebase/firebaseConfig";
import { storage } from "../firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";

// storage
import {
  ref as refe,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const Signup = () => {
  // useRef
  const inputFileRef = useRef();

  const router = useRouter();
  // userState
  const [state, setState] = useState({
    email: "",
    password: "",
    fullname: "",
    error: "",
  });
  // DESTRUCTRUED STATE
  const { email, password, fullname, error } = state;
  // OTHER_STATE
  const [PreviewUrl, SetPreviewUrl] = useState();
  const [Photos, SetPhotos] = useState();

  // handleChange
  const handleChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  // // signupHandler
  const signupHandler = async (e) => {
    e.preventDefault();
    try {
      if (email && password && fullname && PreviewUrl) {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        // update Profile
        await updateProfile(user, {
          displayName: fullname,
          photoURL: PreviewUrl,
        });
        // push data to contact document in firebase
        try {
          const docRef = await addDoc(collection(db, "contact"), {
            fullname: fullname,
            email: email,
            image: PreviewUrl,
            createdTime: Timestamp.now().toDate().toString(),
          });
          setPreviewUrl(null);
          SetPhotos(null);
          setState({ email: "", password: "", fullname: "", error: "" });
          inputFileRef.current.value = "";
        } catch (e) {
          toast.error("ERROR", {
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
        router.push("/verify");
      } else {
        toast.warn("ALL FIELDS MANDATORY", {
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
    } catch (error) {
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

  // handleFile
  const handleFileinput = (e) => {
    const img = e.target.files[0];
    SetPhotos(img);
  };

  // useEffect
  useEffect(() => {
    if (PreviewUrl) {
      // toast notification

      toast.success("IMAGE UPLOADED", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: 0,
        theme: "colored",
      });
    }

    if (Photos && !PreviewUrl) {
      // toast notification
      toast.info("UPLOADING", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: 0,
        theme: "dark",
      });

      // toast notification
      // upload the images
      const storageRef = refe(storage, `images/${Photos.name}`);
      const uploadTask = uploadBytesResumable(storageRef, Photos);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          // switch (snapshot.state) {
          //   case "paused":
          //     console.log("Upload is paused");
          //     break;
          //   case "running":
          //     console.log("Upload is running");
          //     break;
          // }
        },
        (error) => {},
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            SetPreviewUrl(downloadURL);
          });
        }
      );
    }
  }, [Photos]);

  return (
    <>
      <div className="container mx-auto h-auto">
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

        {/* toast notification end */}
        <div className="flex flex-col items-center justify-center py-2 mx-auto">
          <div className=" rounded-2xl shadow-2xl flex w-full max-w-3xl text-center bg-gray-300 ">
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
              <div className="pt-6">
                <h1 className=" flex font-bold text-3xl text-gray-700 mb-1 items-center justify-center">
                  Register Your Account
                </h1>
                <div className="border-2 border-green-500 w-[120px] inline-block mb-2" />
              </div>
              {/* input fields */}
              <form className="flex flex-col items-center justify-center">
                <div className="flex  w-36 h-36 rounded-full bg-gray-200 justify-center items-center my-2 mx-auto cursor-pointer">
                  {PreviewUrl ? (
                    <Image
                      width="200px"
                      height="200px"
                      src={PreviewUrl}
                      alt="profile"
                      className=" rounded-full object-cover"
                      ref={inputFileRef}
                    />
                  ) : (
                    <FaUserTie
                      size={40}
                      className="text-gray-500 cursor-pointer "
                    />
                  )}
                </div>
                <div className="flex items-center justify-center ml-20">
                  <input
                    type="file"
                    onChange={handleFileinput}
                    className="file:bg-green-500 file:rounded-full file:cursor-pointer file:border-0"
                    accept="image/*"
                    name="photourl"
                    ref={inputFileRef}
                    required
                  />
                </div>
                <div className="bg-white w-72 p-2 flex items-center rounded-md mb-3  mt-3">
                  <BiUser className="text-gray-400 " />
                  <input
                    type="text"
                    placeholder="FullName"
                    className=" bg-white flex-1 px-2 py-1 outline-none"
                    onChange={handleChange}
                    value={fullname}
                    name="fullname"
                    required
                  />
                </div>
                <div className="bg-white w-72 p-2 flex items-center rounded-md mb-3 ">
                  <FaRegEnvelope className="text-gray-400" />
                  <input
                    type="email"
                    placeholder="Email"
                    className=" bg-white flex-1 px-2 py-1 outline-none"
                    onChange={handleChange}
                    value={email}
                    name="email"
                    required
                  />
                </div>
                <div className="bg-white w-72 p-2 flex items-center rounded-md mb-3">
                  <MdLockOutline className="text-gray-400" />
                  <input
                    type="password"
                    placeholder="Password"
                    className=" bg-white flex-1 px-2 py-1 outline-none"
                    onChange={handleChange}
                    value={password}
                    name="password"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="border-2 text-green-500 border-green-500 px-16 py-2 rounded-full inline-block font-semibold hover:bg-green-500 hover:text-white"
                  onClick={(e) => signupHandler(e)}
                >
                  SIGN UP
                </button>
                <Link href="/signin">
                  <p className=" text-gray-800 font-semibold my-2">
                    Already Have Account?
                    <span className="text-green-500 ml-2 cursor-pointer hover:text-green-600 underline">
                      SIGN IN
                    </span>
                  </p>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
