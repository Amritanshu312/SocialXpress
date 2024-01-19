import { collection, deleteDoc, doc, endAt, getCountFromServer, getDoc, getDocs, limit, orderBy, query, startAfter, startAt } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db, storage } from "../../config/firebase";
import { onSnapshot } from "firebase/firestore";
import { UserInfo } from "../../contexts/UserInfo";
import { ScreenLoadingInfo } from "../../contexts/screen_Loading";
import { deleteObject, ref } from "firebase/storage";
import { useNavigate } from "react-router-dom";

import InfiniteScroll from "react-infinite-scroll-component";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Posts = () => {
  const [FeedData, setFeedData] = useState([])
  const { info } = useContext(UserInfo)
  const navigate = useNavigate()
  const { setScreenLoading } = useContext(ScreenLoadingInfo)

  const [getfrom, setgetfrom] = useState(6)
  const [totalData, setTotalData] = useState(0)
  const [fetchedData, setFetchData] = useState(0)



  useEffect(() => {
    const queryPosts = query(collection(db, 'posts'));

    const unsubscribe = onSnapshot(queryPosts, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          // setFeedData((prevFeedData) => [change.doc.data(), ...prevFeedData]);
          getPosts()
        }
        if (change.type === 'removed') {
          getPosts()
        }
      });
    });
    return () => unsubscribe();
  }, [db]);


  const getPosts = async () => {
    try {
      const data = await getDocs(query(collection(db, 'posts'), orderBy('createdDate', 'asc'), limit(getfrom)));
      const querySnapshot = await getDocs(collection(db, 'posts'));

      if (!querySnapshot.docs) {
        console.error('Error: Unable to retrieve documents.');
        return;
      }

      const totalData = querySnapshot.docs.length;
      setTotalData(totalData);

      const filteredData = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setFetchData(filteredData.length);

      const uidsToFetch = filteredData.map(item => item.uid);
      const cachedUserInformation = {};
      const uidsToFetchFromApi = uidsToFetch.filter(uid => {
        if (cachedUserInformation[uid]) {
          filteredData.find(item => item.uid === uid).userData = cachedUserInformation[uid];
          return false;
        }
        return true;
      });

      const batchSize = 10;
      const batches = await Promise.all(
        uidsToFetchFromApi
          .map((uid, i) => (i % batchSize === 0 ? uidsToFetchFromApi.slice(i, i + batchSize) : null))
          .filter(Boolean)
          .map(batchUids =>
            Promise.all(batchUids.map(uid => getDoc(doc(db, 'users_', uid))))
          )
      );

      const filteredDataWithUserInfo = filteredData.map((item, index) => ({
        ...item,
        userData: item.userData || batches[Math.floor(index / batchSize)][index % batchSize].data(),
      }));

      setFeedData(filteredDataWithUserInfo);
    } catch (err) {
      console.error(err);
    } finally {
      setScreenLoading(false);
    }
  };
  ;



  const deleteMovie = async (id, name) => {
    setScreenLoading(true);
    const movieDoc = doc(db, "posts", id);
    await deleteDoc(movieDoc);


    if (name) {
      const postRef = ref(storage, `posts/${name}`);
      await deleteObject(postRef);
    }
    setScreenLoading(false);
  };



  const loadMore = () => {
    setgetfrom(getfrom + 6)
    getPosts()
  }

  useEffect(() => loadMore, [])

  return (
    <>
      {<InfiniteScroll
        dataLength={FeedData.length} //This is important field to render the next data
        next={loadMore}
        hasMore={totalData !== fetchedData}
        loader={<div className="Feed_post loading loadingfeed"></div>}>
        {FeedData.map((data) => (
          <div className="Feed_post" key={data._id} >
            <div className="Feed_user_info">

              <div className="User_feed_data_user">
                <div className="Feed_user_image">
                  <LazyLoadImage
                    effect="blur"
                    src={data.userData.photoURL}
                    alt=""
                    onClick={() => navigate(`/user/${data.uid}`)}
                  />
                </div>

                <div className="Feed_user">
                  <div className="Feed_Name" style={{ cursor: 'pointer' }} onClick={() => navigate(`/user/${data.uid}`)}>{data.userData.displayName}</div>
                  <div className="Feed_upload_data">{data.createdDate}</div>
                </div>
              </div>

              {data.uid === info.uid && <div className="Feed_more">
                <svg onClick={() => deleteMovie(data.id, data?.filename)} width="64px" height="64px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#788292"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.288"></g><g id="SVGRepo_iconCarrier"> <path d="M10 12V17" stroke="#788292" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M14 12V17" stroke="#788292" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M4 7H20" stroke="#788292" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="#788292" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#788292" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
              </div>}


            </div>

            <div className="Feed_description">
              <div className="Feed_text">
                {data.feed_description}
              </div>

              {data.Imageurl && <div className="Feed_image">
                <LazyLoadImage
                  effect="blur" width={'100%'} src={data.Imageurl} alt="" />
              </div>}
            </div>
          </ div >

        ))}
      </InfiniteScroll>}

    </>
  );
};

export default Posts;
