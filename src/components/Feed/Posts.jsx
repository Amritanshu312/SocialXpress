import { collection, deleteDoc, doc, getDocs, query } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { onSnapshot } from "firebase/firestore";
import { UserInfo } from "../../contexts/UserInfo";
import { ScreenLoadingInfo } from "../../contexts/screen_Loading";

const Posts = () => {

  const [FeedData, setFeedData] = useState([])
  const { info } = useContext(UserInfo)

  const { setScreenLoading } = useContext(ScreenLoadingInfo)


  useEffect(() => {
    const queryPosts = query(collection(db, 'posts'));

    const unsubscribe = onSnapshot(queryPosts, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          // setFeedData((prevFeedData) => [change.doc.data(), ...prevFeedData]);
          getMovieList()
        }
        // if (change.type === 'modified') {
        //   console.log('Modified post: ', change.doc.data());
        // }
        if (change.type === 'removed') {
          getMovieList()
        }
      });
    });

    return () => {
      unsubscribe();
    };
  }, [db]);



  const getMovieList = async () => {
    try {
      const data = await getDocs(collection(db, "posts"));
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setScreenLoading(false)
      setFeedData(filteredData)
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "posts", id);
    await deleteDoc(movieDoc);
  };


  useEffect(() => {
    getMovieList()
  }, [])
  return (
    FeedData.map((data) => (
      < div className="Feed_post" key={data._id} >
        <div className="Feed_user_info">

          <div className="User_feed_data_user">
            <div className="Feed_user_image">
              <img
                src={data.photoURL}
                alt=""
              />
            </div>

            <div className="Feed_user">
              <div className="Feed_Name">{data.displayName}</div>
              <div className="Feed_upload_data">{data.createdDate}</div>
            </div>
          </div>

          {data.uid === info.uid && <div className="Feed_more">
            <svg onClick={() => deleteMovie(data.id)} width="64px" height="64px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#788292"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.288"></g><g id="SVGRepo_iconCarrier"> <path d="M10 12V17" stroke="#788292" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M14 12V17" stroke="#788292" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M4 7H20" stroke="#788292" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="#788292" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#788292" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
          </div>}


        </div>

        <div className="Feed_description">
          <div className="Feed_text">
            {data.feed_description}
          </div>

          {data.Imageurl && <div className="Feed_image">
            <img src={data.Imageurl} alt="" />
          </div>}


        </div>
      </ div >
    ))


  );
};

export default Posts;
