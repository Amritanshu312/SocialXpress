import { useContext, useState } from "react"
import "./UpdateProfilePopup.css"
import { uploadProfileBanner, uploadProfilePhoto } from "../../utils/UpdateProfile"
import { ScreenLoadingInfo } from "../../contexts/screen_Loading"
import { PreviewImage } from "../../utils/QuickTasks"
import { checkFileupload } from "../../utils/Check_file_upload"
import { doc, updateDoc } from "firebase/firestore"
import { auth, db } from "../../config/firebase"
import { UserInfo } from "../../contexts/UserInfo"


const UpdateProfilePopup = (props) => {
  const { setScreenLoading } = useContext(ScreenLoadingInfo)
  const { setInfo, info } = useContext(UserInfo)

  const { banner, displayName, photoURL } = info
  const { closePopup } = props

  const [UserPhoto, setUserPhoto] = useState(photoURL)
  const [UserBanner, setUserBanner] = useState(banner)
  const [name, setName] = useState(displayName)

  const [profileFile, setProfileFile] = useState([])
  const [ProfileBanner, setProfileBanner] = useState([])

  const saveFile = async () => {
    setScreenLoading(true);

    if (profileFile.length !== 0) {
      try {
        const photoURL = await uploadProfilePhoto(profileFile);
        setInfo({ ...info, photoURL })
      } catch (error) {
        // Handle error appropriately
        console.error('Error uploading profile photo:', error);
      }
    }

    if (ProfileBanner.length !== 0) {
      try {
        let banner = await uploadProfileBanner(ProfileBanner);
        setInfo({ ...info, banner })
      } catch (error) {

      }
    }

    if (name !== displayName) {
      try {
        await updateDoc(doc(db, "users_", auth.currentUser.uid), { displayName: name });
        setInfo({ ...info, displayName: name })
      } catch (error) {
        console.error(error);
      }
    }
    setScreenLoading(false);
    closePopup(false)
  };


  return (
    <div className="UpdateProfile">

      <div className="UpdateProfileHeader">
        <span className="title">Edit profile</span>
        <div className="UpdatePopupclose" onClick={() => props.closePopup(false)}>
          <svg width="163px" height="163px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" strokeWidth="0.00024000000000000003"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path fillRule="evenodd" clipRule="evenodd" d="M19.207 6.207a1 1 0 0 0-1.414-1.414L12 10.586 6.207 4.793a1 1 0 0 0-1.414 1.414L10.586 12l-5.793 5.793a1 1 0 1 0 1.414 1.414L12 13.414l5.793 5.793a1 1 0 0 0 1.414-1.414L13.414 12l5.793-5.793z" fill="#000000"></path></g></svg>
        </div>
      </div>

      <div className="updateProfilePic">
        <h2 className="title">Profile</h2>

        <div className="UpdateImage">
          <img src={UserPhoto} alt="" />
          <label htmlFor="UserPofile" style={{ height: '10rem', width: '10rem', borderRadius: '50%', objectFit: 'cover', cursor: 'pointer', position: 'absolute' }}></label>

          <input id="UserPofile" style={{ display: "none" }} type="file" onChange={e => {
            let fileCheck = checkFileupload(e.target.files[0])
            fileCheck && setProfileFile(e.target.files[0]);
            fileCheck && PreviewImage(e.target.files[0], (result) => setUserPhoto(result))
          }} />
        </div>
      </div>

      <div className="updateProfileCover">
        <h2 className="title">Cover photo</h2>

        <div className="UpdateImage">
          <label htmlFor="bannerUpdate" style={{
            height: '16rem',
            width: '37rem',
            borderRadius: '10px',
            cursor: 'pointer',
            background: `url(${UserBanner ? UserBanner : "https://t4.ftcdn.net/jpg/04/95/28/65/360_F_495286577_rpsT2Shmr6g81hOhGXALhxWOfx1vOQBa.jpg"}) 0% 0% / cover`
          }}></label>

          <input type="file" id="bannerUpdate" style={{ display: "none" }} onChange={e => {
            let fileCheck = checkFileupload(e.target.files[0])
            fileCheck && PreviewImage(e.target.files[0], (preview) => {
              fileCheck && setUserBanner(preview)
              fileCheck && setProfileBanner(e.target.files[0])
            })
          }} />
        </div>
      </div>


      <div className="updateProfileIntro">
        <h2 className="title">Customise your Intro</h2>

        <div className="Intro_input">
          <input type="text" placeholder="Edit Your Name" value={name} onChange={e => setName(e.target.value)} />
        </div>

        <div className="save">
          <button onClick={saveFile}>Save</button>
        </div>
      </div>

    </div>
  )
}

export default UpdateProfilePopup