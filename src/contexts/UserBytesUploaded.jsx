import { collection, getDocs, query, where } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../config/firebase";

export const UserBytesStoredInfo = createContext();

const UserBytesStoredState = (props) => {
  const [usersByte, setUsersByte] = useState(0);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async function (user) {
      if (user?.uid) {
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
      }
    });

    return () => unsubscribe(); // Cleanup the subscription on component unmount
  }, []); // Empty dependency array to run the effect once on mount

  return (
    <UserBytesStoredInfo.Provider value={{ usersByte }}>
      {props.children}
    </UserBytesStoredInfo.Provider>
  );
};

export default UserBytesStoredState;
