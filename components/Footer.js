import React from "react";
// react-icons
import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";
import { AiFillYoutube } from "react-icons/ai";
const Footer = () => {
  return (
    <>
      <div className="container  mx-auto static bottom-0 mt-5  ">
        <footer className="text-center bg-gray-900 text-white  ">
          <div className=" px-6 pt-6">
            <div className="flex  justify-center items-center mb-6 ">
              <a
                href="https://www.facebook.com/Iskcon-Janakpurdham-1396412813830770"
                type="button"
                className="rounded-full border-1 border-white text-white leading-normal uppercase hover:bg-black hover:bg-opacity-5 focus:outline-none   w-9 h-9 m-2 "
              >
                <AiFillFacebook className="w-7 h-7 fill-current text-blue-600" />
              </a>
              <a
                href="https://www.youtube.com/channel/UCgsIXg-qARXVh3XS3a7UvXQ"
                type="button"
                className="rounded-full border-1 border-white text-white leading-normal uppercase hover:bg-black hover:bg-opacity-5 focus:outline-none  w-9 h-9 m-2 "
              >
                <AiFillYoutube className="w-7 h-7 fill-current text-red-600" />
              </a>
            </div>
          </div>
          <div className="text-center px-4 font-bold text-lg text-green-500">
            ISKCON JANAKPUR
          </div>
          <span className="block text-gray-400 py-2">
            © 2022 All Rights reserved
          </span>
        </footer>
      </div>
    </>
  );
};

export default Footer;
