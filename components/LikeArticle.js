import React, { useState, useEffect } from "react";
// react-icons
import { AiFillLike } from "react-icons/ai";

// firebase
import { db } from "../firebase/firebaseConfig";
import { auth } from "../firebase/firebaseConfig";
import { useRouter } from "next/router";

import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

const LikeArticle = ({ id, likes }) => {
  const [user, setUser] = useState();
  const likesRef = doc(db, "events", id);
  const router = useRouter();

  // handleLike
  const handleLike = (e) => {
    // e.preventDefault();
    if (user) {
      if (likes?.includes(user.uid)) {
        updateDoc(likesRef, {
          likes: arrayRemove(user.uid),
        })
          .then(() => {
            // console.log("unliked");
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        updateDoc(likesRef, {
          likes: arrayUnion(user.uid),
        })
          .then(() => {
            // console.log("liked");
          })
          .catch((e) => {
            console.log(e);
          });
      }
    } else {
      router.push("/signin");
    }
  };
  useEffect(() => {
    // onPage Refresh
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <div>
      {user && likes?.includes(user?.uid) ? (
        <AiFillLike size={20} className="text-blue-500" onClick={handleLike} />
      ) : (
        <AiFillLike size={20} onClick={handleLike} />
      )}
    </div>
  );
};

export default LikeArticle;
