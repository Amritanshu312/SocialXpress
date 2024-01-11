import React, { useContext } from 'react'
import Home from './pages/Home'
import { Routes, Route } from "react-router-dom";
import Auth from './pages/Auth';
import UserState from './contexts/UserInfo';
import Loading from './components/loading/Loading';
import { ScreenLoadingInfo } from './contexts/screen_Loading';

const App = () => {
  const { ScreenLoading } = useContext(ScreenLoadingInfo)
  console.log(ScreenLoading);
  return (
    <>
      <UserState>
        {ScreenLoading && <Loading />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>

      </UserState>
    </>
  )
}

export default App