import React, { useState, useEffect } from "react";
//These are Third party packages for smooth slideshow
import { Zoom } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
// next
import Image from "next/image";
// firebase
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const Slider = () => {
  const [Images, setImages] = useState();
  const [Loading, setLoading] = useState(true);

  // useEffect
  useEffect(() => {
    // fetchData
    const unsub = onSnapshot(
      collection(db, "featuredPhotos"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        if (list == []) {
          setLoading(true);
        } else {
          setLoading(false);
          setImages(list);
        }
      },
      (error) => {
        alert(error.message);
      }
    );
    return () => {
      unsub();
    };
  }, []);

  //These are custom properties for zoom effect while slide-show
  const zoomInProperties = {
    indicators: true,
    scale: 1.2,
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    prevArrow: (
      <div className="w-[30px] opacity-30 hover:opacity-100 m-3 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="#2e2e2e"
        >
          <path d="M242 180.6v-138L0 256l242 213.4V331.2h270V180.6z" />
        </svg>
      </div>
    ),
    nextArrow: (
      <div className="w-[30px] opacity-30 hover:opacity-100 m-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="#2e2e2e"
        >
          <path d="M512 256L270 42.6v138.2H0v150.6h270v138z" />
        </svg>
      </div>
    ),
  };
  return (
    <div className="m-2 ">
      {Loading && Images == undefined && (
        <div className="h-[300px] w-full flex justify-center items-center ">
          <h1 className="text-3xl font-bold ">Loading</h1>
        </div>
      )}
      <Zoom {...zoomInProperties}>
        {Images &&
          Images.map((val) => {
            const { photo, id } = val;
            return (
              <div
                key={id}
                className="flex justify-center w-full  h-[30vh] md:h-full"
              >
                <Image
                  className=" rounded-lg shadow-xl"
                  src={photo}
                  width="1240px"
                  height="500px"
                  object-fit="cover"
                  alt="featuredImage"
                />
              </div>
            );
          })}
      </Zoom>
    </div>
  );
};

export default Slider;
