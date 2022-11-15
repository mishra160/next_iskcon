import React from "react";
import Image from "next/image";

const DevoteeCard = ({ member, item }) => {
  return (
    <>
      {member &&
        member
          .filter((val) => {
            if (item == "") {
              return val;
            } else if (
              val.fullname.toLowerCase().includes(item.toLowerCase())
            ) {
              return val;
            }
          })
          .map((val) => {
            return (
              <div
                className="my-3 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3 hover:scale-105 transition ease-in-out delay-50"
                key={val.id}
              >
                <article className="  flex flex-col  justify-center items-center overflow-hidden rounded-lg shadow-lg bg-green-400  pt-2 cursor-pointer">
                  <Image
                    alt="profile"
                    width="200px"
                    height="200px"
                    object-fit="cover"
                    className="block rounded-full   border-4 border-red-400"
                    src={val.image}
                  />
                  <header className="flex flex-col items-center justify-between leading-tight">
                    <h1 className="text-2xl font-bold py-1">{val.fullname}</h1>
                    <p className="font-bold text-gray-500 ">MEMBER SINCE</p>
                    <span className="font-mono font-weight-700 pb-2">
                      {val.createdTime.substr(0, 16)}
                    </span>
                  </header>
                </article>
              </div>
            );
          })}
    </>
  );
};

export default DevoteeCard;
