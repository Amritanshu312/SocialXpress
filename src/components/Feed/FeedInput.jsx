import React, { useContext, useState } from "react";
import { UserInfo } from "../../contexts/UserInfo";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../../config/firebase";
import GifPicker from "gif-picker-react";
import { PreviewImage, generateRandomString } from "../../utils/QuickTasks";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { checkFileupload } from "../../utils/Check_file_upload";

const FeedInput = (props) => {
  const moviesCollectionRef = collection(db, "posts");
  const [postingdata, setPostingdata] = useState({ feed_description: "" });
  const [ToggleGIf, setToggleGIf] = useState({ toggle: false, url: "" });
  const [progressbar, setProgressbar] = useState(null);
  const { info } = useContext(UserInfo);
  const [imagetoupload, setImagetoupload] = useState('')
  const [previewIMG, setPreviewIMG] = useState('')

  const navigate = useNavigate()

  const onSubmitMovie = async () => {
    const { uid } = info;

    const createdDate = new Date().toLocaleString();
    try {
      if (postingdata.feed_description !== "") {
        setPostingdata({ ...postingdata, feed_description: "" });

        if (typeof imagetoupload !== 'string') {
          if (!imagetoupload) {
            return toast("Please choose a file first!")
          }

          if (!(imagetoupload.type === "image/png" || imagetoupload.type === "image/jpeg")) {
            return toast("PNG, JPG, JPEG files only")
          }

          if (imagetoupload.size <= !1000000) { return toast("Please Upload Files smaller than 1 mb") }

          const filename = `${generateRandomString()}.${imagetoupload.name.split('.').pop()}`
          const storageRef = ref(storage, `posts/${filename}`);
          const uploadTask = uploadBytesResumable(storageRef, imagetoupload);

          // Wait for the upload to complete
          await new Promise((resolve, reject) => {
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                const percent = Math.round(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgressbar(`${percent}%`);
              },
              (error) => {
                reject(error);
              },
              () => {
                resolve();
              }
            );
          });

          // Download URL
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          addDoc(moviesCollectionRef, {
            ...postingdata,
            uid,
            Imageurl: url,
            filename,
            _id: generateRandomString(),
            createdDate,
          });

          setToggleGIf({ toggle: false });
          setImagetoupload('');
          setProgressbar("100%");

          setTimeout(() => {
            setProgressbar(null);
          }, 1000);
        }

        if (typeof imagetoupload === 'string') {
          await addDoc(moviesCollectionRef, {
            ...postingdata,
            uid,
            Imageurl: imagetoupload,
            _id: generateRandomString(),
            createdDate,
          });
          setToggleGIf({ toggle: false });
          setImagetoupload('');
          setProgressbar("100%");

          setTimeout(() => {
            setProgressbar(null);
          }, 1000);
        }
      } else {
        toast("Please choose a file first!")
        setProgressbar(null);
      }
    } catch (err) {
      console.error(err);
    }
  };


  const onchange = (e) =>
    setPostingdata({ ...postingdata, [e.target.name]: e.target.value });
  return (
    <div className="Feed__Input" style={props.addpost ? { boxShadow: '0px 0px 48px 14px #646464', position: "relative", zIndex: '10' } : {}}>
      <div className="Input">
        <div className="Feed_img">
          <img src={info.photoURL || "icon/userdummyprofile.svg"} onClick={() => info.photoURL && navigate(`/user/${info.uid}`)} alt="" />
        </div>

        <input
          className="Feed__input"
          type="text"
          name="feed_description"
          placeholder={`What’s on you mind, ${info.displayName || "Guest"}?`}
          onChange={onchange}
          value={postingdata.feed_description}
        />

        {info.email && (
          <button
            className="Feed_Send"
            disabled={!info.LoggedIn}
            onClick={onSubmitMovie}
          >
            Send
          </button>
        )}
      </div>

      {imagetoupload && (
        <div className="Feed_Post_preview">
          <img src={typeof imagetoupload === 'string'
            ? imagetoupload
            : (PreviewImage(imagetoupload, (e) => setPreviewIMG(e)), previewIMG)} alt="" />

          <svg
            onClick={() => { setImagetoupload(""); setPreviewIMG('') }}
            fill="#788292"
            height="64px"
            width="64px"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 460.775 460.775"
            xmlSpace="preserve"
            stroke="#788292"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55 c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55 c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505 c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55 l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719 c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"></path>{" "}
            </g>
          </svg>
        </div>
      )}

      {ToggleGIf.toggle && (
        <GifPicker
          tenorApiKey={import.meta.env.VITE_TENSOR__API__GIF}
          onGifClick={(data) => {
            setImagetoupload(data.preview.url);
          }}
          width={"100%"}
        />
      )}

      <div className="Feed__Upload__option">
        {progressbar === null ? (
          <>
            <label className="Feed_upload" htmlFor="photoupload">Photo</label>
            <input style={{ display: 'none' }} accept="image/png, image/jpeg" type="file" id="photoupload" onChange={e => {
              let fileCheck = checkFileupload(e.target.files[0]);
              fileCheck && setImagetoupload(e.target.files[0]);
              fileCheck && ToggleGIf.toggle && setToggleGIf({ toggle: !ToggleGIf.toggle })
            }} />

            <div
              className="Feed_upload"
              onClick={() =>
                setToggleGIf({ ...ToggleGIf, toggle: !ToggleGIf.toggle })
              }>
              Gif
            </div>
            <div className="Feed_upload">Feeling/activity</div>
          </>
        ) : (
          <div className="Feed_upload_bar">
            <div
              className="Feed_upload_bar_PG_Bar"
              style={{ width: progressbar }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedInput;
