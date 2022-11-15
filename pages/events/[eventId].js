import React, { useState, useEffect } from "react";
// next
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

// componenets
import Layout from "@/components/Layout";
import LikeArticle from "@/components/LikeArticle";

// firebase
import { db, auth } from "../../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
// uuid
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

import {
  doc,
  getDoc,
  updateDoc,
  arrayRemove,
  arrayUnion,
  onSnapshot,
} from "firebase/firestore";

// react-icons
import { FaRegComment } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
// react-share
import { FacebookShareButton } from "react-share";
import { FacebookIcon } from "react-share";

const Event = ({ slgid }) => {
  const router = useRouter();
  // useState
  // blog state
  const [Article, setArticle] = useState();
  const [Comments, setComments] = useState();
  const [user, setUser] = useState(null);
  const [pathsId, setpathsId] = useState(router.query.eventId);

  // handleComment Post Section
  const commentRef = doc(db, "events", slgid);
  const handleChangeComment = (e) => {
    e.preventDefault();
    updateDoc(commentRef, {
      comments: arrayUnion({
        userID: user.uid,
        fullname: user.displayName,
        message: Comments,
        createdAt: new Date().toString(),
        commentId: uuidv4(),
        photo: user.photoURL,
      }),
    });

    setComments("");
  };

  // handleDeleteComment
  // delete comment function
  const handleDeleteComment = (comment) => {
    updateDoc(commentRef, {
      comments: arrayRemove(comment),
    })
      .then((e) => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const fetcher = (id) => {
    const unsub = onSnapshot(doc(db, "events", id), (doc) => {
      setArticle(doc.data());
    });
  };
  // const readyrouter = router.isReady;
  // useEffect
  useEffect(() => {
    fetcher(pathsId);

    // onPage Refresh
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, [pathsId]);

  const shareUrl = `https://iskconjanakpur.netlify.app/events/${pathsId}`;

  return (
    <>
      <Layout>
        {Article && (
          <div className="flex flex-col max-w-7xl mx-auto  h-full">
            <div className="flex  justify-center items-center">
              <Image
                src={Article.image}
                width="1200px"
                height="540px"
                object-fit="cover"
                className="rounded-lg object-cover"
                alt="featured image"
              />
            </div>
            <div className="mt-5  flex-col  ">
              {/* published date */}
              <div className="px-6 py-1 ml-4 mb-2">
                <div className="md:flex sm:flex-col  justify-between">
                  <span className="font-bold text-gray-700 mr-1 my-[5px]">
                    PublishedAt:-
                    <span className="py-1 md: px-3 bg-gray-400 rounded-full font-mono">
                      {Article?.createdTime &&
                        Article.createdTime.substr(0, 16)}
                    </span>
                  </span>
                  <div>
                    <div className="flex  items-center justify-left mt-3">
                      <span className="font-bold text-gray-500 mr-2">
                        Share Via :-
                      </span>
                      <FacebookShareButton
                        url={shareUrl}
                        quote="ISKCON_TEMPLE"
                        hastag="#ISKCON_JANAKPUR"
                      >
                        <FacebookIcon round={true} size={30}></FacebookIcon>
                      </FacebookShareButton>
                    </div>
                  </div>
                </div>
              </div>
              {/* title */}
              <h1 className="text-xl font-black ml-10 text-gray-700 mt-3 mb-3">
                {Article?.title}
              </h1>
              <p className="ml-10 font-bold text-[18px] text-gray-500 mb-5">
                {Article?.description}
              </p>
              {/* date and time  */}
              <div className="grid grid-flow-col justify-around  pb-2  mt-5">
                <p className="bg-green-400 text-[18px] rounded-full px-10 py-1 font-bold mb-2 text-center text-sm leading-tight ">
                  TIME:-<span>{Article?.time}</span>
                </p>
                <p className="bg-green-400 text-[18px] rounded-full px-10 py-1 font-bold mb-2 text-center text-sm leading-tight">
                  DATE:- <span>{Article?.date}</span>
                </p>
              </div>
              {/* date time end */}
              {/* like & comment */}
              <hr />
              <div className="grid grid-flow-col justify-around mt-5 ">
                <div className="flex ">
                  <span className="mx-3 font-semibold text-gray-500">
                    {Article?.likes && Article.likes.length}
                  </span>
                  <div className="flex cursor-pointer hover:scale-105 active:text-blue-500">
                    <LikeArticle id={pathsId} likes={Article?.likes} />
                    <span className="font-semibold text-gray-500">Likes</span>
                  </div>
                </div>
                <div className="flex">
                  <span className=" mx-3 font-semibold text-gray-500">
                    {Article?.comments && (
                      <span className=" font-semibold text-gray-500">
                        {Article?.comments.length}
                      </span>
                    )}
                  </span>
                  <div className="flex cursor-pointer ">
                    <FaRegComment size={20} className="mr-[3px]" />
                    <span className="font-semibold text-gray-500">
                      Comments
                    </span>
                  </div>
                </div>
              </div>
              <hr className="mt-3" />
              {/* like & comment */}
              {/* commment post section */}
              {user ? (
                <div className="flex justify-between items-center  bg-gray-200 p-6 rounded-md mt-5 mx-3">
                  <div className="mr-3">
                    <Image
                      width="60px"
                      height="60px"
                      src={user.photoURL}
                      objectFit="cover"
                      className="rounded-full"
                      alt="profile"
                    />
                  </div>
                  <textarea
                    className="border-[1px] h-20 rounded-md resize-none w-full px-4 py-2 mr-4"
                    placeholder="Add a comment..."
                    spellCheck="false"
                    value={Comments}
                    onChange={(e) => setComments(e.target.value)}
                  />
                  <button
                    className="bg-green-500 text-white w-36 h-12 font-bold rounded-lg hover:opacity-80"
                    onClick={(e) => {
                      handleChangeComment(e);
                    }}
                  >
                    SEND
                  </button>
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center mt-[20px] mb-[20px]">
                  <h1 className=" font-bold text-gray-600 sm:text-sm">
                    PLEASE LOG IN FOR LIKE AND COMMENT SECTION
                  </h1>
                  <div className="">
                    <span className="font-bold text-sm ">Alread Member?</span>
                    <Link href="/signin">
                      <span className="text-blue-400 underline font-semibold m-2 cursor-pointer">
                        SignIn
                      </span>
                    </Link>
                    <span className="font-bold text-sm">OR Create One?</span>

                    <Link href="/signup">
                      <span className="text-blue-400 underline font-semibold m-2 cursor-pointer">
                        SignUp
                      </span>
                    </Link>
                  </div>
                </div>
              )}

              {/* comment post section-end */}
              {/* comments 1 displayed */}

              <div className="flex justify-center items-center mt-3">
                <p className="text-md font-bold underline">RECENT COMMENTS</p>
              </div>
              {Article?.comments &&
                Article.comments.map((msg) => {
                  const {
                    userID,
                    fullname,
                    message,
                    createdAt,
                    commentId,
                    photo,
                  } = msg;
                  return (
                    <div
                      className="flex flex-col bg-gray-500 rounded-lg mt-5 p-3 mx-3"
                      key={commentId}
                    >
                      <div className=" flex items-center gap-2 ">
                        <Image
                          width="40px"
                          height="40px"
                          src={photo}
                          objectFit="cover"
                          className="rounded-full"
                          alt="profile"
                        />
                        <h1 className="font-semibold text-l">{fullname}</h1>
                        <p className="ml-10">
                          {moment(Date.parse(createdAt)).fromNow()}
                        </p>
                      </div>
                      <div className="flex  w-full h-auto ml-11 justify-between">
                        <p className="text-sm font-bold text-white  overflow-hidden">
                          {message}
                        </p>
                        {user?.uid == userID ? (
                          <div className="mr-[48px] ">
                            <AiFillDelete
                              size={24}
                              className="text-red-700 cursor-pointer hover:scale-105"
                              onClick={() =>
                                handleDeleteComment({
                                  userID,
                                  fullname,
                                  message,
                                  createdAt,
                                  commentId,
                                  photo,
                                })
                              }
                            />
                          </div>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              {/* commment 1 displayed end  */}
            </div>
          </div>
        )}
      </Layout>
    </>
  );
};

// // nextjs serversideProps
export async function getServerSideProps(context) {
  const slugId = context.query.eventId;

  return {
    props: { slgid: slugId }, // will be passed to the page component as props
  };
}

export default Event;
