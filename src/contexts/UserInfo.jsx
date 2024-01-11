import { createContext, useEffect, useState } from "react";
import { auth } from "../config/firebase"

export const UserInfo = createContext()

const UserState = (props) => {
  const [info, setInfo] = useState({})

  const getuserinfo = () => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        let LoggedIn = true
        const { email, emailVerified, displayName, photoURL, uid } = user
        setInfo({ email, emailVerified, displayName, photoURL, uid, LoggedIn })
      }
      else {
        setInfo({ LoggedIn: false })
      }
    })
  }

  useEffect(() => getuserinfo(), [])
  return (
    <UserInfo.Provider value={{ info }}>
      {props.children}
    </UserInfo.Provider>
  )
}

export default UserState