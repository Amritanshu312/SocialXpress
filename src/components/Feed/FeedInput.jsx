import React, { useContext, useState } from "react";
import { UserInfo } from "../../contexts/UserInfo";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import GifPicker from 'gif-picker-react';


const FeedInput = () => {
  const moviesCollectionRef = collection(db, "posts");
  const [postingdata, setPostingdata] = useState({ feed_description: "" });
  const [ToggleGIf, setToggleGIf] = useState({ toggle: false, url: '' })
  const [progressbar, setProgressbar] = useState(null)
  const { info } = useContext(UserInfo);

  const onSubmitMovie = async () => {
    const { photoURL, displayName, email, uid } = info;
    const generateRandomString = () => Math.random().toString(36).substring(2, 26);
    const createdDate = new Date().toLocaleString()
    try {
      setProgressbar('10%')
      setTimeout(() => setProgressbar('50%'), 400);

      if (postingdata.feed_description !== "") {
        setPostingdata({ ...postingdata, feed_description: "", });
        await addDoc(moviesCollectionRef, {
          ...postingdata, uid, photoURL,
          Imageurl: ToggleGIf.url,
          _id: generateRandomString(),
          displayName,
          email,
          createdDate,
        });
        setToggleGIf({ toggle: false, url: '' })

        setProgressbar('100%')

        setTimeout(() => {
          setProgressbar(null)
        }, 1500);
      } else alert("please write something if you want to post"), setProgressbar(null)


    } catch (err) {
      console.error(err);
    }
  };

  const onchange = (e) =>
    setPostingdata({ ...postingdata, [e.target.name]: e.target.value });
  return (
    <div className="Feed__Input">
      <div className="Input">
        <div className="Feed_img">
          <img src={info.photoURL || "icon/userdummyprofile.svg"} alt="" />
        </div>

        <input
          className="Feed__input"
          type="text"
          name="feed_description"
          placeholder={`What’s on you mind, ${info.displayName || "Guest"}?`}
          onChange={onchange}
          value={postingdata.feed_description}
        />

        {info.email && <button
          className="Feed_Send"
          disabled={!info.LoggedIn}
          onClick={onSubmitMovie}
        >
          Send
        </button>}
      </div>

      {ToggleGIf.url && (
        <div className="Feed_Post_preview">
          <img src={ToggleGIf.url} alt="" />
          <svg onClick={() => setToggleGIf({ ...ToggleGIf, url: '' })} fill="#788292" height="64px" width="64px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 460.775 460.775" xmlSpace="preserve" stroke="#788292"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55 c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55 c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505 c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55 l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719 c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"></path> </g></svg>
        </div>
      )}


      {ToggleGIf.toggle && <GifPicker tenorApiKey={import.meta.env.VITE_TENSOR__API__GIF} onGifClick={(data) => { setToggleGIf({ ...ToggleGIf, url: data.preview.url }) }} width={'100%'} />}

      <div className="Feed__Upload__option">
        {progressbar === null ? (<><div className="Feed_upload">Photo</div>
          <div className="Feed_upload" onClick={() => setToggleGIf({ ...ToggleGIf, toggle: !ToggleGIf.toggle })}>Gif</div>
          <div className="Feed_upload">Feeling/activity</div></>)
          :
          <div className="Feed_upload_bar">
            <div className="Feed_upload_bar_PG_Bar" style={{ width: progressbar }}></div>
          </div>}
      </div>


    </div>
  );
};

export default FeedInput;
