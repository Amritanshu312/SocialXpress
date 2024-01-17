import React, { useContext, useEffect, useState } from 'react'
import "./Navbar.css"
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { UserInfo } from '../../contexts/UserInfo';

const Navbar = () => {

  const [profilePic, setProfilePic] = useState("")
  const { info } = useContext(UserInfo)
  const navigation = useNavigate()
  const { userID } = useParams()


  useEffect(() => setProfilePic(info?.photoURL || 'icon/userdummyprofile.svg'), [info?.photoURL])


  const logout = async () => {
    try {
      await signOut(auth);
      navigation('/auth')
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="Navbar">
      <div></div>

      <ul className='navbar__center'>

        <li className="navbar__li active"><Link to="/" >Home</Link></li>
        <li className="navbar__li"><a href="#">Notification</a></li>
        <li className="navbar__li"><a href="#">Watch</a></li>
        <li className="navbar__li"><a href="#">Marketplace</a></li>
        <li className="navbar__li"><a href="#">Groups</a></li>
        <li className="navbar__li"><a href="#">Messenger</a></li>
        <li className="navbar__li"><a href="#">Live</a></li>
      </ul>

      <div className="navbar__userInfo">
        <div className="Sidebar__logo" onClick={() => navigation('/')}><img src="/icon/facebook.webp" alt="Logo" /></div>
        <img src="/icon/search.webp" alt="" />
        {!profilePic.includes('.svg') && <img src="/icon/logout.svg" alt="" onClick={logout} />}
        <div className="navbar__user__img">
          <img src={profilePic} onClick={() => profilePic.includes('.svg') ? navigation('/auth') : !userID && navigation(`/user/${info.uid}`)} alt="User Image" />
        </div>
      </div>

    </div>
  )
}

export default Navbar