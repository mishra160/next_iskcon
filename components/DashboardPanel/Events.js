import React, { useState, useEffect, useRef } from "react";
// next
import Image from "next/image";
// moment
import moment from "moment";
// truncate
import truncate from "truncate";

// // firebase Default
import {
  collection,
  addDoc,
  Timestamp,
  orderBy,
  onSnapshot,
  query,
  doc,
  deleteDoc,
} from "firebase/firestore";
import {
  ref as refe,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
// firebaseConfig
import { db } from "../../firebase/firebaseConfig";
import { storage } from "../../firebase/firebaseConfig";

// toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DashboardEvents = () => {
  // STATE
  const [Post, setPost] = useState();
  const [Photos, SetPhotos] = useState();
  const [Imageurl, setImageurl] = useState();
  const [state, setState] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
  });
  // destructing
  const { title, description, date, time } = state;

  // USEREF
  const inputFileRef = useRef();

  // HANDLE FUNCTIONS
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };
  // handleSubmit button
  const hanldeSubmit = (e) => {
    e.preventDefault();
    if (title && description && date && time && Imageurl) {
      pushData();
      // success toast
      toast.success("EVENT CREATED", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      toast.warn("ALL FIELDS ARE MANDATORY", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    setState({
      title: "",
      description: "",
      date: "",
      time: "",
      photoUrl: "",
    });
    setImageurl(null);
    SetPhotos(null);
    inputFileRef.current.value = "";
  };
  // handleFile
  const handleFileinput = (e) => {
    const img = e.target.files[0];
    SetPhotos(img);
  };
  // push data to firebase
  const pushData = async () => {
    // push data to contact document in firebase
    try {
      const docRef = await addDoc(collection(db, "events"), {
        title: title,
        description: description,
        image: Imageurl,
        date: date,
        time: moment(time, ["HH.mm"]).format("hh:mm a"),
        createdTime: Timestamp.now().toDate().toString(),
      });
      // console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      // error toast
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
    }
  };
  // fetching data
  const fetchData = async () => {
    const eventDB = await getDocs(collection(db, "events"));
    const eventList = eventDB.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setPost(eventList);
  };
  const handleEventDelete = async (e, idx) => {
    e.preventDefault();
    const docRef = doc(db, "events", idx);
    await deleteDoc(docRef).then(() => {
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
    });
  };

  // useEffect
  useEffect(() => {
    if (Photos && !Imageurl) {
      // toast notification
      toast.info("UPLOADING", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: 0,
        theme: "dark",
      });
    }
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

        setPost(list);
      },
      (error) => {
        // alert(error.message);
        // error toast
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
      }
    );

    if (Photos) {
      // upload the images
      const storageRef = refe(storage, `events/${Photos.name}`);
      const uploadTask = uploadBytesResumable(storageRef, Photos);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // console.log("Upload is " + progress + "% done");
        },
        (error) => {
          // Handle unsuccessful uploads
          alert(error.message);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // console.log("File available at", downloadURL);
            setImageurl(downloadURL);
          });
        }
      );
    }
  }, [Photos]);

  return (
    <>
      <div id="events" className="h-auto" smooth="true">
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
        {/* CREATE EVENT SECTION */}
        <h1 className="font-extrabold text-5xl text-center mb-10 underline">
          EVENTS
        </h1>
        <div className="bg-white rounded-2xl shadow-2xl flex w-full max-w-4xl mx-auto ">
          {/* input fields */}
          <form className="flex flex-col w-full h-auto mx-5">
            <h1 className="text-3xl text-center font-bold my-2">
              CREATE AN EVENT
            </h1>

            <div className="bg-gray-200  p-2  rounded-md mb-3  mt-2">
              <input
                type="text"
                placeholder="Title"
                className=" bg-gray-200 py-1 outline-none w-full"
                onChange={handleChange}
                value={title}
                name="title"
                required
              />
            </div>
            <div className="bg-gray-200 w-full  p-2  rounded-md mb-3  mt-2">
              <textarea
                className="block w-full bg-gray-200  rounded-lg outline-none"
                rows="3"
                placeholder="Description"
                onChange={handleChange}
                value={description}
                name="description"
              ></textarea>
            </div>
            <div className=" flex flex-wrap -mx-3 mb-2">
              <span className="font-bold py-1 mx-2 my-1 "> DATE:-</span>
              <input
                type="date"
                placeholder="2021-02-23"
                className=" w-2/5 bg-gray-200  p-2 outline-none rounded-md"
                onChange={handleChange}
                value={date}
                name="date"
                required
              />
              <span className="font-bold py-1 mx-2 my-1 ">TIME:-</span>
              <input
                type="time"
                placeholder="09:30 AM"
                className="w-2/5 bg-gray-200  p-2 outline-none rounded-md"
                onChange={handleChange}
                value={time}
                name="time"
                required
              />
            </div>
            <div className="bg-gray-200 rounded-md mb-4 p-2 w-full  ">
              <input
                type="file"
                className="file:rounded-full file:bg-green-500 file:border-0 file:text-white file:items-center  file:shadow-lg file:cursor-pointer text-center"
                accept=".jpeg,.jpg,.png,.webp ,.svg"
                onChange={handleFileinput}
                name="myfile"
                ref={inputFileRef}
                required
              />
            </div>

            <button
              className="py-2 bg-green-500 mb-3  font-bold cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed "
              onClick={(e) => hanldeSubmit(e)}
              disabled={!Imageurl}
            >
              SUBMIT
            </button>
          </form>
        </div>
        {/* Horizontal Cards */}
        {/* photos section */}
        <section className="overflow-hidden text-gray-700 mb-10 ">
          <div className="container px-5 py-2 mx-auto lg:pt-12 lg:px-32">
            <div className="flex flex-wrap -m-1 md:-m-2 ">
              {Post &&
                Post.map((pst) => {
                  const {
                    id,
                    title,
                    description,
                    createdTime,
                    date,
                    time,
                    image,
                    likes,
                    comments,
                  } = pst;
                  return (
                    <div className="mx-7" key={id}>
                      <div className="py-7 cursor-pointer hover:scale-105 transition ease-in-out delay-50">
                        <div className="rounded overflow-hidden shadow-lg max-w-sm">
                          <Image
                            width="540px"
                            height="440px"
                            object-fit="cover"
                            src={image}
                            alt="profile"
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
                          <button
                            className="w-full py-2 bg-red-500 rounded-md font-bold text-white"
                            onClick={(e) => handleEventDelete(e, id)}
                          >
                            DELETE
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </section>
      </div>

      {/* <div className="w-full h-auto flex justify-center items-center">
        <h1 className="text-2xl font-bold">Loading</h1>
      </div>
       */}
    </>
  );
};

export default DashboardEvents;
