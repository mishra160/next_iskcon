import React from "react";
import Image from "next/image";
// public images
import esewa from "../public/esewa.jpg";
import khalti from "../public/khalti.jpg";
import banktransfer from "../public/banktransfer.jpg";

const Donation = () => {
  return (
    <>
      {/* <!-- Jumbotron --> */}
      <div className="container mx-auto bg-gray-200">
        <h1 className="text-center mt-10 mb-2 text-5xl space-x-2 capitalize  font-bold text-gray-700 p-5 ">
          DONATIONS
        </h1>
        <hr className="mx-auto w-1/3 border-4 border-green-500 cursor-pointer" />
        {/* <!-- Jumbotron --> */}
        <div className="p-6 shadow-lg rounded-lg bg-gray-200 text-gray-700 relative">
          <h2 className="font-italic  text-xl mb-5 text-center">
            “More smiling, less worrying. More compassion, less judgment. More
            blessed, less stressed. More love, less hate.”
          </h2>
          <span className="absolute text-sm text-gray-400 font-semibold bottom-[20px] right-[50px]">
            ― Roy T. Bennett
          </span>
        </div>
        {/* jumbtron-end */}
        {/* donation-card-section */}
        <div className="grid grid-cols-1  lg:grid-cols-3 lg:gap-3 justify-items-center mt-2">
          {/* esewa card */}
          <div className="py-7  ">
            <div className="rounded-lg overflow-hidden shadow-lg max-w-sm">
              <Image
                src={esewa}
                alt="esewa"
                width="540px"
                height="540px"
                object-fit="cover"
              />
              <div className="px-6 py-4 ">
                <h1 className="font-bold text-xl mb-2 text-center">
                  COMING UP SOON
                </h1>
              </div>
            </div>
          </div>
          {/* esewa-card-end */}
          {/* khalti-card */}
          <div className="py-7  ">
            <div className="rounded-lg overflow-hidden shadow-lg max-w-sm">
              <Image
                src={khalti}
                alt="khalti"
                width="540px"
                height="540px"
                object-fit="cover"
              />
              <div className="px-6 py-4 ">
                <h1 className="font-bold text-xl mb-2 text-center">
                  COMING UP SOON
                </h1>
              </div>
            </div>
          </div>
          {/* khalti-card-end */}
          {/* bank-transfer-card */}
          <div className="py-7  ">
            <div className="rounded-lg overflow-hidden shadow-lg max-w-sm">
              <Image
                src={banktransfer}
                alt="bank-transfer"
                width="540px"
                height="540px"
                object-fit="cover"
              />
              <div className="px-6 py-4 ">
                <h1 className="font-bold text-xl mb-2 text-center">
                  COMING UP SOON
                </h1>
              </div>
            </div>
          </div>
          {/* bank-transfer-card-end */}
        </div>
      </div>
    </>
  );
};

export default Donation;
