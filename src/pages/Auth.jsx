import React from 'react'
import { auth, googleProvider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css"

const Auth = () => {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
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