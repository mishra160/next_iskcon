import React, { useEffect, useState } from "react";

// firebase
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

// next
import Image from "next/image";
import Link from "next/link";
// truncate
import truncate from "truncate";

const Event = () => {
  // state
  const [event, setEvent] = useState();
  const [Loading, setLoading] = useState(true);

  // useEffect
  useEffect(() => {
    // collection refrence
    const colRef = collection(db, "events");
    // query
    const que = query(colRef, orderBy("createdTime", "desc"), limit(3));
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
          setEvent(list);
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
      <div className="container mx-auto bg-gray-200">
        <h1 className="text-center mt-10 mb-2 text-5xl space-x-2 capitalize  font-bold text-gray-700 p-5 ">
          RECENT EVENTS
        </h1>
        <hr className="mx-auto w-1/3 border-4 border-green-500 cursor-pointer hover:border-green-500 duration-500" />

        {Loading && event == undefined && (
          <div className="h-[300px] w-full flex justify-center items-center ">
            <h1 className="text-3xl font-bold ">Loading</h1>
          </div>
        )}
        {/* cards section */}
        <div className="grid grid-cols-1  lg:grid-cols-3 lg:gap-3 justify-items-center mt-7">
          {/* First card */}
          {event &&
            event.map((evnt) => {
              const {
                id,
                title,
                image,
                date,
                time,
                description,
                createdTime,
                comments,
                likes,
              } = evnt;
              return (
                <Link href={`/events/${id}`} key={id}>
                  <div className="py-7 cursor-pointer hover:scale-105 transition ease-in-out delay-50">
                    <div className="rounded overflow-hidden shadow-lg max-w-sm">
                      <Image
                        width="540px"
                        height="440px"
                        objectFit="cover"
                        src={image}
                        alt="cover"
                      />
                      <div className="px-6 py-1  text-center">
                        <span className="font-bold text-gray-500 mr-1 my-[5px]">
                          PublishedAt:-
                        </span>
                        <span className="py-1 px-3 bg-gray-400 rounded-full font-mono">
                          {createdTime && createdTime.substr(0, 16)}
                        </span>
                      </div>
                      <div className="px-6">
                        <h1 className="font-bold text-2xl pb-2 leading-tight">
                          {title}
                        </h1>
                        <p className="font-semibold text-sm text-gray-500 mb-3 h-12">
                          {truncate(description, 60)}
                        </p>
                      </div>
                      <div className="grid grid-flow-col gap-5 pb-2 px-6">
                        <p className="bg-green-400 text-sm rounded-full px-3 py-1 font-bold mb-2 text-center leading-tight">
                          TIME:-<span>{time}</span>
                        </p>
                        <p className="bg-green-400 text-sm rounded-full px-3 py-1 font-bold mb-2 text-center leading-tight">
                          DATE:- <span>{date}</span>
                        </p>
                      </div>
                      {/* like & comment */}
                      <div className="grid grid-flow-col gap-5 pb-2 px-6">
                        <div className="flex">
                          <span className="mx-2 font-semibold text-gray-500">
                            {likes && likes.length}
                          </span>
                          <span className="font-semibold text-gray-500">
                            Likes
                          </span>
                        </div>
                        <div className="flex justify-end">
                          <span className="mx-2 font-semibold text-gray-500">
                            {comments && (
                              <span className="mx-2 font-semibold text-gray-500">
                                {comments.length}
                              </span>
                            )}
                          </span>
                          <span className="font-semibold text-gray-500">
                            Comments
                          </span>
                        </div>
                      </div>
                      {/* like & comment */}
                    </div>
                  </div>
                </Link>
              );
            })}
          {/* First-card-end */}
        </div>

        <Link href="/events">
          <button
            type="button"
            className=" relative mb-3 w-full inline-block px-6 py-2.5 bg-green-500 text-white font-bold text-xl leading-normal uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out mx-auto justify-items-center"
          >
            More Events
          </button>
        </Link>
      </div>
    </>
  );
};

export default Event;
