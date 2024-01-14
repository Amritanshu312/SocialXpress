import React from 'react'
import "../styles/Home.css"
import Navbar from '../components/Navbar/Navbar'
import Sidebar from '../components/Sidebar/Sidebar'
import Feeds from '../components/Feed/Feeds'
import { ToastContainer } from 'react-toastify';



const Home = () => {

  return (
    <div className='container'>
      <Navbar />
      <Sidebar />
      <Feeds />

      <ToastContainer />
    </div>
  )
}

export default Home