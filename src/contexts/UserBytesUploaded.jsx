import { collection, getDocs, query, where } from "firebase/firestore";
import { createContext, useState } from "react"
import { auth, db } from "../config/firebase";

export const UserBytesStoredInfo = createContext()

const UserBytesStoredState = (props) => {
  const [UsersByte, setUsersByte] = useState(0)

  auth.onAuthStateChanged(async function (user) {
    try {
      const firestoreRef = query(collection(db, 'posts'), where('uid', '==', user?.uid));
      const querySnapshot = await getDocs(firestoreRef);
      const userposts = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      let byte = 0;

      userposts.forEach((data) => {
        if (data?.FileSize) {
          byte += data?.FileSize;
        }
      });

      setUsersByte(Math.floor(byte));


    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  })

  return (
    <UserBytesStoredInfo.Provider value={{ UsersByte }}>
      {props.children}
    </UserBytesStoredInfo.Provider>
  )
}

export default UserBytesStoredState