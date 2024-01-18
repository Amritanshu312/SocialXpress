import React, { useContext } from 'react'
import Home from './pages/Home'
import { Routes, Route } from "react-router-dom";
import Auth from './pages/Auth';
import UserState from './contexts/UserInfo';
import Loading from './components/loading/Loading';
import { ScreenLoadingInfo } from './contexts/screen_Loading';
import User_Profile from './pages/User_Profile';
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify';
import UserBytesStoredState from './contexts/UserBytesUploaded';

const App = () => {
  const { ScreenLoading } = useContext(ScreenLoadingInfo)

  return (
    <>
      <UserState>
        {ScreenLoading && <Loading />}
        <UserBytesStoredState>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/user/:userID" element={<User_Profile />} />
          </Routes>
        </UserBytesStoredState>
        <ToastContainer />

      </UserState>
    </>
  )
}

export default App