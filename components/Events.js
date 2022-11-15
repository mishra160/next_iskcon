import React, { useEffect, useState } from "react";
import truncate from "truncate";

// next
import Image from "next/image";
import Link from "next/link";

// firebase
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const Events = () => {
  // state
  const [Event, setEvent] = useState([]);
  const [Searchitem, setSearchitem] = useState("");
  const [Loading, setLoading] = useState(true);

  // useEffect
  useEffect(() => {
    // fetchData
    // collection refrence
    const colRef = collection(db, "events");
    // query
    const que = query(colRef, orderBy("createdTime", "desc"));
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
          setEvent(list);
          setLoading(false);
        }
      },
      (error) => {
        alert("SOMETHING WENT WRONG ");
      }
    );
    return () => {
      unsub();
    };
  }, []);

  return (
    <>
      <div className="container mx-auto bg-gray-200">
        <h1 className="text-center mt-2  text-5xl space-x-2 capitalize  font-bold text-gray-700 p-5 ">
          EVENTS
        </h1>
        <div className="flex items-center justify-center mb-2">
          <input
            className="py-2 px-3 w-[250px] h-[45px] rounded-full"
            type="search"
            placeholder="Search Events"
            onChange={(e) => setSearchitem(e.target.value)}
          />
        </div>
        <hr className="mx-auto w-1/3 border-4 border-green-500 cursor-pointer hover:border-green-600 " />
        {Loading && (
          <div className="h-[40vh] flex items-center justify-center">
            <h1 className="text-3xl font-bold">Loading</h1>
          </div>
        )}
        {/* card section  */}

        <div className="grid grid-cols-1  lg:grid-cols-3 lg:gap-3 justify-items-center mt-7">
          {Event &&
            Event.filter((val) => {
              if (Searchitem == "") {
                return val;
              } else if (
                val.title.toLowerCase().includes(Searchitem.toLowerCase())
              ) {
                return val;
              }
            }).map((val) => {
              const {
                id,
                title,
                description,
                date,
                time,
                image,
                createdTime,
                likes,
                comments,
              } = val;
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
        </div>
      </div>
    </>
  );
};

export default Events;
