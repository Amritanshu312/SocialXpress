import { createContext, useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";

export const UserInfo = createContext();

const UserState = (props) => {
  const [info, setInfo] = useState({});

  const getuserinfo = async () => {
    auth.onAuthStateChanged(async function (user) {
      if (user) {
        let LoggedIn = true;
        let datauser = await getDoc(doc(db, 'users_', user.uid));

        console.log(datauser.data());
        const { email, emailVerified, displayName, photoURL, banner, uid } = datauser.data();
        setInfo({ email, emailVerified, displayName, photoURL, uid, banner, LoggedIn });
      } else {
        setInfo({ LoggedIn: false });
      }
    });
  };

  useEffect(() => {
    getuserinfo();
  }, []);

  return (
    <UserInfo.Provider value={{ info, setInfo }}>
      {props.children}
    </UserInfo.Provider>
  );
};

export default UserState;
