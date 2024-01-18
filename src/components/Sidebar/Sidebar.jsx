import React, { useContext } from 'react'
import './Sidebar.css'
import { isAddPostInfo } from '../../contexts/IsAddPost'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
  const { setIsAddPost } = useContext(isAddPostInfo)
  const navigate = useNavigate()
  return (
    <div className="Sidebar">
      <div className="Sidebar__logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        <img src="/icon/facebook.webp" alt="Logo" />
      </div>

      <div className="Sidebar__icons">
        <img src="/icon/movies.webp" alt="" />
        <img src="/icon/bookmark.webp" alt="" />
        <img src="/icon/joystick.webp" alt="" />
        <img src="/icon/fav.webp" alt="" />

        <div className="Sidebar__create" onClick={() => { setIsAddPost(true); navigate('/') }}>
          <img src="/icon/plus.webp" alt="" />
        </div>

        <img src="/icon/folder_movie.webp" alt="" />
        <img src="/icon/help.webp" alt="" />
        <img src="/icon/setting.webp" alt="" />
        <img src="/icon/more.webp" alt="" />
      </div>

      <div className="Sidebar__create" onClick={() => { setIsAddPost(true); navigate('/') }}>
        <img src="/icon/plus.webp" alt="" />
      </div>
    </div>
  )
}

export default Sidebar