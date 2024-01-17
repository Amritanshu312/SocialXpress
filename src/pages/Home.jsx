import React from 'react'
import "../styles/Home.css"
import Navbar from '../components/Navbar/Navbar'
import Sidebar from '../components/Sidebar/Sidebar'
import Feeds from '../components/Feed/Feeds'


const Home = () => {
  return (
    <div className='container'>
      <Navbar />
      <Sidebar />
      <Feeds />

    </div>
  )
}

export default Home