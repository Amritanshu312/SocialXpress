import React, { useEffect, useState } from 'react'
import "./Navbar.css"
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const [profilePic, setProfilePic] = useState("")
  const navigation = useNavigate()


  auth.onAuthStateChanged(function (user) {
    if (user) {
      localStorage.setItem('photoURL', auth?.currentUser?.photoURL)
    }
    else setProfilePic('icon/userdummyprofile.svg')
  })

  useEffect(() => setProfilePic(localStorage.getItem('photoURL') || 'icon/userdummyprofile.svg', []))

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('photoURL')
      navigation('/auth')
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="Navbar">
      <div></div>

      <ul className='navbar__center'>
        <li className="navbar__li"><a href="#">Home</a></li>
        <li className="navbar__li active"><a href="#">Notification</a></li>
        <li className="navbar__li"><a href="#">Watch</a></li>
        <li className="navbar__li"><a href="#">Marketplace</a></li>
        <li className="navbar__li"><a href="#">Groups</a></li>
        <li className="navbar__li"><a href="#">Messenger</a></li>
        <li className="navbar__li"><a href="#">Live</a></li>
      </ul>

      <div className="navbar__userInfo">
        <img src="icon/search.webp" alt="" />
        {!profilePic.includes('.svg') && <img src="icon/logout.svg" alt="" onClick={logout} />}

        <div className="navbar__user__img">
          <img src={profilePic} onClick={e => profilePic.includes('.svg') && navigation('/auth')} alt="User Image" />
        </div>
      </div>

    </div>
  )
}

export default Navbar