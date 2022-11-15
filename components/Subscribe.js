import React from "react";
import Link from "next/link";

const Subscribe = () => {
  return (
    <>
      <div className="container mx-auto mt-3">
        {/* <!-- Bg white --> */}
        <div className="max-w-screen-xl bg-gray-200 shadow-2xl rounded-lg mx-auto text-center pt-10  mt-4">
          <h2 className="text-2xl  mx-auto leading-9   tracking-wide text-gray-800 sm:text-3xl sm:leading-10 mb-5 sm:px-2  ">
            SUBSCRIBE TO OUR SOCIAL MEDIA LINKS FOR MORE INFORMATION CONTACT US
          </h2>
          <Link href="/contact">
            <button
              type="button"
              className="w-1/3 px-2 py-2 bg-green-500 font-semibold rounded-md  text-white  text-2xl mb-5"
            >
              Contact Us
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Subscribe;
