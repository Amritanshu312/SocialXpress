import React from 'react'
import './Sidebar.css'

const Sidebar = () => {
  return (
    <div className="Sidebar">
      <div className="Sidebar__logo">
        <img src="/icon/facebook.webp" alt="Logo" />
      </div>

      <div className="Sidebar__icons">
        <img src="/icon/movies.webp" alt="" />
        <img src="/icon/bookmark.webp" alt="" />
        <img src="/icon/joystick.webp" alt="" />
        <img src="/icon/fav.webp" alt="" />

        <div className="Sidebar__create">
          <img src="/icon/plus.webp" alt="" />
        </div>

        <img src="/icon/folder_movie.webp" alt="" />
        <img src="/icon/help.webp" alt="" />
        <img src="/icon/setting.webp" alt="" />
        <img src="/icon/more.webp" alt="" />
      </div>

      <div className="Sidebar__create">
        <img src="/icon/plus.webp" alt="" />
      </div>
    </div>
  )
}

export default Sidebar