import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import donation from "../public/donation.jpeg";

const Donateus = () => {
  const [amount, setAmount] = useState(0);
  const [paymentResponse, setPaymentResponse] = useState({});

  const handlePaymentforEsewa = () => {
    axios({
      method: "post",
      url: "https://khalti.com/api/v2/",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_KHALTI_KEY}`,
      },
      data: {
        amount: amount,
      },
    })
      .then((response) => {
        setPaymentResponse(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className=" mb-12 lg:flex">
      <div className="lg:w-1/2 xl:max-w-screen-sm lg:pt-[120px]">
        {/* <div className="py-12 bg-indigo-100 lg:bg-gray-200 flex justify-center lg:justify-start lg:px-12">
          <div className="cursor-pointer flex items-center"></div>
        </div> */}
        <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
          <h2
            className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
                    xl:text-bold"
          >
            PAYMENT GATEWAY
          </h2>
          <div className="mt-10">
            <form>
              <div className="mt-7">
                <div>
                  <div>
                    <div>
                      <p className="block mb-2 text-xl font-bold text-gray-600 ">
                        AMOUNT
                      </p>
                      <input
                        type="number"
                        value={amount}
                        className="bg-gray-200 w-full py-3 pl-5 rounded-full border-2 mb-5 border-gray-400 border-1"
                        placeholder="ENTER AMOUNT IN PAISA"
                        onChange={(e) => setAmount(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <button
                    className="bg-purple-600 text-gray-100 p-4 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-purple-700
                                shadow-lg"
                    onClick={handlePaymentforEsewa}
                  >
                    PAY VAI KHALTI
                  </button>
                  <div>
                    {paymentResponse.status === "success" && (
                      <p>Payment successful!</p>
                    )}
                    {paymentResponse.status === "failure" && (
                      <p>Payment failed.</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-10">
                <button
                  className="bg-green-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-green-600
                                shadow-lg"
                >
                  PAY VAI ESEWA
                </button>
              </div>
            </form>
            <div className=" mt-12 text-sm font-display font-semibold text-gray-700 text-center">
              {/* <p>YOUR PAYMENT IS SUCCEDED</p>
              <p>YOUR PAYMENT FAILED</p> */}
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex items-center justify-center bg-indigo-100 flex-1 h-screen">
        <div className=" mt-8   cursor-pointer">
          <Image
            src={donation}
            alt="khalti"
            width="652"
            height="845"
            object-fit="cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Donateus;
