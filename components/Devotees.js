import React, { useEffect, useState } from "react";
import Image from "next/image";

// firebase
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

// components
import DevoteeCard from "@/components/DevoteeCard";
const Devotees = () => {
  // useState
  const [Member, setMember] = useState();
  const [Loading, setLoading] = useState(true);
  const [SearchItem, setSearchItem] = useState("");

  // fetch All member

  useEffect(() => {
    // collection refrence
    const colRef = collection(db, "contact");
    // query
    const que = query(colRef, orderBy("createdTime", "desc"));
    const unsub = onSnapshot(
      que,
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        if (list === []) {
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
    <>
      <div className="container bg-gray-200 my-3 mb-[55px] mx-auto px-4 md:px-12 ">
        {/* heading title */}
        <h1 className="text-center mt-2 mb-2 text-5xl  capitalize  font-bold text-gray-700 p-5 ">
          DEVOTEES
        </h1>
        <div className="flex items-center justify-center mb-2">
          <input
            className="py-2 px-3 w-[250px] h-[45px] rounded-full"
            type="search"
            placeholder="Search Events"
            onChange={(e) => setSearchItem(e.target.value)}
          />
        </div>
        <hr className="mx-auto w-1/3 border-4 border-green-500 cursor-pointer" />
        {Loading && Member == undefined && (
          <div className="h-[300px] w-full flex justify-center items-center ">
            <h1 className="text-3xl font-bold ">Loading</h1>
          </div>
        )}
        <div className="flex flex-wrap -mx-1 lg:-mx-4">
          {/* <!-- Column --> */}

          {/* <!-- Article --> */}

          {Member && <DevoteeCard member={Member} item={SearchItem} />}
        </div>
      </div>
    </>
  );
};

export default Devotees;
