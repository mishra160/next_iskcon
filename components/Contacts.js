import React, { useMemo, useRef } from "react";

import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";
import { AiFillYoutube } from "react-icons/ai";

import { auth } from "../firebase/firebaseConfig";

import emailjs from "@emailjs/browser";

// GOOGLE MAPS
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

// toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contacts = () => {
  const formRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();

  //   hadlesemailjs
  const sendEmail = (e) => {
    e.preventDefault();
    //  emailjs

    emailjs
      .sendForm(
        "service_33",
        "template_7i27iif",
        formRef.current,
        "gbYCt6o5Izu9C_98U"
      )
      .then(
        (result) => {
          toast.success("Message Sent Succesfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          formRef.current.reset();
        },
        (error) => {
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
      );
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACES_API,
  });
  if (!isLoaded) {
    return <div className="text-xl font-bold text-center">LOADING...</div>;
  }

  return (
    <>
      <div className="container mx-auto mt-2 h-auto">
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
        <div className="relative mx-auto w-full max-w-7xl bg-white text-gray-700">
          <div className="grid grid-cols-2">
            {/* :MAP CONTAINER */}
            <div className="order-1 col-span-full">
              <Map />
            </div>
            {/* :CONTACT FORM CONTAINER */}
            <div className="order-3 md:order-2 col-span-full md:col-span-1 py-5 md:py-10 px-6">
              <form
                ref={formRef}
                action=""
                className="mx-auto max-w-xl space-y-4 "
                onSubmit={sendEmail}
              >
                {/* ::Name Input */}
                <div>
                  {/* :::label */}
                  <label htmlFor="name" className="sr-only">
                    Name
                  </label>
                  {/* :::input */}
                  <input
                    ref={nameRef}
                    type="text"
                    id="user_name"
                    name="user_name"
                    placeholder="Name"
                    className="form-input w-full block shadow-sm rounded  bg-gray-100 text-base placeholder-gray-300  px-2 py-3 focus:outline-green-500 "
                  />
                </div>
                {/* ::Email Input */}
                <div>
                  {/* :::label */}
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  {/* :::input */}
                  <input
                    ref={emailRef}
                    type="email"
                    id="email"
                    name="user_email"
                    placeholder="Email Address"
                    className="form-input w-full block shadow-sm rounded bg-gray-100 placeholder-gray-300 text-base focus:outline-green-500 px-2 py-3"
                  />
                </div>
                {/* ::Message Input */}
                <div className="col-span-full">
                  {/* :::label */}
                  <label htmlFor="message" className="sr-only">
                    Message
                  </label>
                  {/* :::input */}
                  <textarea
                    ref={messageRef}
                    name="message"
                    id="message"
                    cols="30"
                    rows="4"
                    placeholder="How can we help?"
                    className="form-textarea resize-none w-full shadow-sm rounded  bg-gray-100 placeholder-gray-300 focus:outline-green-500 px-2 py-2"
                  ></textarea>
                </div>
                {/* ::Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="py-2 px-6 rounded bg-green-500 text-base text-white font-semibold uppercase hover:bg-green-600"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
            {/* :CONTACT INFOS CONTAINER */}
            <div className="order-2 md:order-3 col-span-full md:col-span-1 py-5 md:py-10 px-6">
              <div className="mx-auto max-w-xl flex flex-col space-y-5">
                {/* ::Title Contact Us */}
                <h2 className="text-5xl font-bold uppercase">Contact us</h2>
                {/* ::Text */}
                <p className="text-lg text-gray-500">
                  `&quot;` JanakpurDham is a unique and beautiful city. It is
                  the birth place of Mata Janaki and famous for well-known
                  temple Janaki Mandir `&quot;`
                </p>
                {/* ::Email contact */}
                <a
                  href="https://www.gmail.com"
                  className="inline-flex items-center text-lg text-green-500 font-semibold hover:text-green-600"
                >
                  <FcGoogle className="mr-2 w-7 h-7" />
                  iskconjnk@gmail.com
                </a>
                {/* ::Address */}
                <p className="text-base text-gray-500 leading-6">
                  Basbitti `&ldquo;` Dudhmati-22`&ldquo;` <br /> JanakpurDham
                  <br /> Nepal
                </p>
                {/* ::Socials */}
                <div className="flex items-center">
                  {/* :FACEBOOK */}
                  <a
                    href="https://www.facebook.com/Iskcon-Janakpurdham-1396412813830770"
                    className="m-1.5 w-8 h-8 inline-flex justify-center items-center shadow-sm rounded-full bg-[#4267B2] text-white filter hover:brightness-125"
                    style={{ backgroundColor: "#4267B2" }}
                  >
                    {/* ::facebook svg */}
                    <AiFillFacebook className="w-4 h-4 fill-current" />
                  </a>
                  {/* :Instagram */}
                  <a
                    href="https://www.youtube.com/channel/UCgsIXg-qARXVh3XS3a7UvXQ"
                    style={{ backgroundColor: "#FF0000" }}
                    className="m-1.5 w-8 h-8 inline-flex justify-center items-center shadow-sm rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 text-white filter hover:brightness-125"
                  >
                    {/* ::instagram svg */}
                    <AiFillYoutube className="w-4 h-4 fill-current" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Map component
function Map() {
  const center = useMemo(() => ({ lat: 26.7275154, lng: 85.9061944 }), []);
  return (
    <GoogleMap
      zoom={16}
      center={center}
      mapContainerStyle={{ width: "100%", height: "50vh" }}
    >
      <Marker position={center} />
    </GoogleMap>
  );
}

export default Contacts;
