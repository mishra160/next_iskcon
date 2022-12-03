import React, { useState, useEffect, useRef } from "react";

import iskcon_logo from "../../public/iskcon_logo.png";

// next
import Image from "next/image";

// firebase
import {
  ref as refe,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db } from "../../firebase/firebaseConfig";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  limit,
  serverTimestamp,
} from "firebase/firestore";
import { storage } from "../../firebase/firebaseConfig";

// toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DashboardFeatureimage = () => {
  // ref
  const inputRef = useRef();

  // STATE
  const [Images, setImages] = useState("");
  const [PreviewUrl, setPreviewUrl] = useState("");
  const [featuredImage, setFeaturedImage] = useState([]);

  // handleChanges functions
  const handleChange = (e) => {
    const img = e.target.files[0];
    setImages(img);
  };

  // handleDelete functions
  const handleDelete = async (e, id, photo) => {
    e.preventDefault();
    // deleteObject from storage
    const imageRef = refe(storage, photo);
    await deleteObject(imageRef).catch((error) => {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    });
    // deleteDoc from firestore
    const docRef = doc(db, "featuredPhotos", id);
    await deleteDoc(docRef)
      .then(() => {
        // console.log(`document id ${docRef.id} was deleted `);
        toast.success("DELETED SUCCESSFULLY", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch((error) => {
        toast.error(error.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };
  const handleUpload = async (e) => {
    e.preventDefault();
    toast.success("UPLOADED", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

    try {
      // databaseReference

      const dbRef = collection(db, "featuredPhotos");
      const data = {
        createdAt: serverTimestamp(),
        photo: PreviewUrl,
      };
      // reset fileInput
      inputRef.current.value = null;
      if (data.photo) {
        await addDoc(dbRef, data);
        setPreviewUrl(null);
        setImages(null);
      }
      // reset inputFile
    } catch (error) {
      alert("something went wrong");
    }
  };

  useEffect(() => {
    if (Images) {
      // upload the images
      const storageRef = refe(storage, `featuredImages/${Images.name}`);
      const uploadTask = uploadBytesResumable(storageRef, Images);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          // Handle unsuccessful uploads
          alert("something went wrong");
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setPreviewUrl(downloadURL);
          });
        }
      );
    }

    // fetchData
    // collection refrence
    const colRef = collection(db, "featuredPhotos");
    // query
    const que = query(colRef, orderBy("createdAt", "desc"), limit(5));
    const unsub = onSnapshot(
      que,
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setFeaturedImage(list);
      },
      (error) => {
        alert("SOMETHING WENT WRONG ");
      }
    );
  }, [Images]);

  return (
    <>
      <div id="featuredimages" className="mb-50">
        {/* Toast Notification */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <ToastContainer />
        <h1 className="text-center  text-5xl font-extrabold underline mb-5">
          FEATURED IMAGE
        </h1>

        <div className="ml-[200px] py-5">
          <input
            type="file"
            onChange={handleChange}
            className="file:rounded-full file:bg-green-500 file:border-0   ml-[100px] file:py-2 file:px-3  file:cursor-pointer"
            accept=".jpeg,.jpg,.png,.webp ,.svg"
            ref={inputRef}
            required
            name="myfile"
          />
          <button
            className="ml-[50px] py-1 px-4 bg-green-500 rounded-full font-bold disabled:bg-gray-400 disabled:cursor-not-allowed "
            onClick={(e) => handleUpload(e)}
            disabled={!PreviewUrl}
          >
            UPLOAD
          </button>
        </div>
        {/* photos section */}
        <section className="overflow-hidden text-gray-700 mb-10 ">
          <div className="container px-5 py-2 mx-auto lg:pt-12 lg:px-32">
            <div className="flex flex-wrap -m-1 md:-m-2 ">
              {featuredImage &&
                featuredImage.map((val) => {
                  const { id, photo } = val;
                  return (
                    <div className="flex flex-wrap w-1/3" key={id}>
                      <div className="w-full p-1 md:p-2">
                        <img
                          alt="gallery"
                          className=" w-[300px] h-[300px]  block object-cover object-center  rounded-lg"
                          src={photo}
                        />
                        <button
                          className="w-full py-2 bg-red-600 text-white font-bold  rounded-lg"
                          onClick={(e) => handleDelete(e, id, photo)}
                        >
                          DELETE
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </section>
      </div>

    </>
  );
};

export default DashboardFeatureimage;
