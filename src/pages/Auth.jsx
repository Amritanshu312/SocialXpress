import React, { useContext, useEffect } from 'react'
import { auth, db, googleProvider } from "../config/firebase";
import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css"
import { ScreenLoadingInfo } from '../contexts/screen_Loading';
import { doc, setDoc } from 'firebase/firestore';

const Auth = () => {
  const navigate = useNavigate();
  const { setScreenLoading } = useContext(ScreenLoadingInfo)
  useEffect(() => { onAuthStateChanged(auth, (user) => { if (user) { navigate("/") } setScreenLoading(false) }); }, [])


  const signInWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);

      const { displayName, email, phoneNumber, photoURL, uid } = userCredential.user
      userCredential.user.metadata.creationTime === userCredential.user.metadata.lastSignInTime && await setDoc(doc(db, "users_", userCredential.user.uid), { displayName, email, phoneNumber, photoURL, uid, banner: "" })

      navigate("/")
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='AUTH'>
      <button onClick={signInWithGoogle}>
        Sign In With Google
      </button>
    </div>
  )
}

export default Auth