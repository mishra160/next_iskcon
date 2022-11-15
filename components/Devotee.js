import React, { useEffect, useState } from "react";
// next
import Image from "next/image";
import Link from "next/link";

// firebase
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const Devotee = () => {
  // useState
  const [Member, setMember] = useState();
  const [Loading, setLoading] = useState(true);

  // useEffect
  useEffect(() => {
    // collection refrence
    const colRef = collection(db, "contact");
    // query
    const que = query(colRef, orderBy("createdTime", "desc"), limit(3));
    const unsub = onSnapshot(
      que,
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        if (list == []) {
          setLoading(true);
        } else {
          setLoading(false);
          setMember(list);
        }
      },
      (error) => {
        alert("SOMETHING WENT WRONG");
      }
    );
    return () => {
      unsub();
    };
  }, []);

  return (
    <div className="container mt-10 mx-auto px-4 md:px-12 bg-gray-200">
      {/* heading title */}
      <h1 className="text-center mt-2 mb-2 text-5xl  capitalize  font-bold text-gray-700 p-5 ">
        RECENT DEVOTEES
      </h1>
      <hr className="mx-auto w-1/2 border-4 border-green-500 cursor-pointer mb-7" />
      {Loading && Member == undefined && (
        <div className="h-[300px] w-full flex justify-center items-center ">
          <h1 className="text-3xl font-bold ">Loading</h1>
        </div>
      )}
      <div className="flex flex-wrap -mx-1 lg:-mx-4">
        {/* <!-- Column --> */}

        {Member &&
          Member.map((memb) => {
            return (
              <div
                className="my-3 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3 hover:scale-105 transition ease-in-out delay-50"
                key={memb.id}
              >
                <article className="  flex flex-col  justify-center items-center overflow-hidden rounded-lg shadow-lg bg-green-400  pt-2 cursor-pointer">
                  <Image
                    alt="profile"
                    width="200px"
                    height="200px"
                    object-fit="cover"
                    className="block rounded-full   border-4 border-red-400"
                    src={memb.image}
                  />
                  <header className="flex flex-col items-center justify-between leading-tight">
                    <h1 className="text-2xl font-bold py-1">{memb.fullname}</h1>
                    <p className="font-bold text-gray-500 ">MEMBER SINCE</p>
                    <span className="font-mono font-weight-700 pb-2">
                      {memb.createdTime.substr(0, 16)}
                    </span>
                  </header>
                </article>
              </div>
            );
          })}
        {/* <!-- END Article --> */}
        {/* <!-- END Column --> */}
      </div>
      <Link href="/devotees">
        <button
          type="button"
          className=" relative mb-3 mt-2 w-full inline-block px-6 py-2.5 bg-green-500 text-white font-bold text-xl leading-normal uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out mx-auto justify-items-center"
        >
          All Devotees
        </button>
      </Link>
    </div>
  );
};

export default Devotee;
