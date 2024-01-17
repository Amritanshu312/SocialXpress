import React, { useContext, useEffect, useState } from 'react'
import { ScreenLoadingInfo } from '../contexts/screen_Loading'
import "../styles/User_Profile.css"
import Navbar from '../components/Navbar/Navbar'
import Sidebar from '../components/Sidebar/Sidebar'
import { collection, deleteDoc, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { db, storage } from '../config/firebase'
import { useNavigate, useParams } from 'react-router-dom';
import { UserInfo } from '../contexts/UserInfo'
import { deleteObject, ref } from 'firebase/storage'
import { isAddPostInfo } from '../contexts/IsAddPost'
import UpdateProfilePopup from '../components/Update_profile/UpdateProfilePopup'

const User_Profile = () => {
  const { setScreenLoading } = useContext(ScreenLoadingInfo)
  const [userdata, setUserdata] = useState()
  const [isAddProfile, setIsAddProfile] = useState(false)

  const { userID } = useParams()
  const { info } = useContext(UserInfo)
  const { setIsAddPost } = useContext(isAddPostInfo)

  const navigate = useNavigate()

  const [Postswiththatuid, setPostwiththatuid] = useState([])

  useEffect(() => {
    setScreenLoading(true)
    const fetchData = async () => {
      try {
        let datauser = await (await getDoc(doc(db, 'users_', userID))).data()
        setUserdata(datauser);
        setScreenLoading(false)
      } catch (error) { console.error("Error fetching user data:", error) }
    };
    const fetchPosts = async () => {
      const firestoreRef = query(collection(db, "posts"), where("uid", "==", userID))
      const querySnapshot = await getDocs(firestoreRef);
      let userposts = []
      querySnapshot.forEach((doc) => {
        userposts.push({ id: doc.id, ...doc.data() });
      }); setPostwiththatuid(userposts);
    }
    fetchPosts()
    info.uid !== userID && fetchData();
  }, []);


  const deleteMovie = async (id, name) => {
    const movieDoc = doc(db, "posts", id);
    await deleteDoc(movieDoc);
    if (name) {
      const desertRef = ref(storage, `posts/${name}`);
      await deleteObject(desertRef)
    }

    setPostwiththatuid(Postswiththatuid.filter((data) => {
      return data.id !== id;
    }));

  };

  return <>
    <Navbar />
    <Sidebar />
    {isAddProfile && <UpdateProfilePopup closePopup={setIsAddProfile} />}


    <div className="profile_container">
      <div className="User_info_and_bannner">
        <div className="profile_banner">
          <img src={info.uid === userID ? info.banner !== "" ? info.banner : 'https://t4.ftcdn.net/jpg/04/95/28/65/360_F_495286577_rpsT2Shmr6g81hOhGXALhxWOfx1vOQBa.jpg' : userdata?.banner ? userdata.banner : 'https://t4.ftcdn.net/jpg/04/95/28/65/360_F_495286577_rpsT2Shmr6g81hOhGXALhxWOfx1vOQBa.jpg'} alt="" />
        </div>

        <div className="Profile_info">
          <div className="profile_Img">
            <img src={info.uid === userID ? info.photoURL : userdata?.photoURL} alt="" />
          </div>

          <div className="Profile_Name">{info.uid === userID ? info.displayName : userdata?.displayName}</div>
        </div>

        {info.uid === userID && (<div className="profileEdit">
          <button className='active' onClick={() => { navigate("/"); setIsAddPost(true) }}>Add a post</button>
          <button onClick={() => setIsAddProfile(!isAddProfile)}>Edit Profile</button>
        </div>)}


      </div>

      <div className="Profile_posts">
        <h2 className='Profile_Heading'>{info.uid === userID ? "Your Posts" : `Posts By ${info.uid === userID ? info.displayName : userdata?.displayName}`}</h2>


        {Postswiththatuid.map((data) => <div className="Feed_post" key={data.id} >
          <div className="Feed_user_info">

            <div className="User_feed_data_user">
              <div className="Feed_user_image">
                <img
                  src={info.uid === userID ? info.photoURL : userdata?.photoURL}
                  alt=""
                />
              </div>

              <div className="Feed_user">
                <div className="Feed_Name">{info.uid === userID ? info.displayName : userdata?.displayName}</div>
                <div className="Feed_upload_data">{data?.createdDate}</div>
              </div>

            </div>

            {data.uid === info.uid && <div className="Feed_more">
              <svg onClick={() => deleteMovie(data.id, data?.filename)} width="64px" height="64px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#788292"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.288"></g><g id="SVGRepo_iconCarrier"> <path d="M10 12V17" stroke="#788292" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M14 12V17" stroke="#788292" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M4 7H20" stroke="#788292" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="#788292" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#788292" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
            </div>}


          </div>

          <div className="Feed_description">
            <div className="Feed_text">{data?.feed_description}</div>

            {data.Imageurl && <div className="Feed_image">
              <img src={data.Imageurl} alt="" />
            </div>}

          </div>

        </div >)}

      </div>
    </div>
  </>;
}

export default User_Profile