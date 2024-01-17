import {
  ref,
  getDownloadURL,
  uploadString
} from "firebase/storage";
import { auth, db, storage } from "../config/firebase"; // Assuming you have a 'storage' export in your firebase config
import { doc, updateDoc } from "firebase/firestore";
import { compressFile, resizeFile } from "./Check_file_upload";

export async function uploadProfilePhoto(file) {
  try {
    if (!file) {
      alert("Please choose a file first!");
      return;
    }

    const uri = await resizeFile(file);


    if (!uri) return

    const storageRef = ref(storage, `/user/${auth.currentUser.uid}/profile_logo.webp`);
    const uploadTask = await uploadString(storageRef, uri, "data_url");

    // Download URL
    const downloadURL = await getDownloadURL(uploadTask.ref);
    if (downloadURL) {
      const user = await updateDoc(doc(db, "users_", auth.currentUser.uid), { photoURL: downloadURL });
    }



    return downloadURL;
  } catch (error) {
    console.error("Error uploading profile photo:", error);
    // Handle the error appropriately (e.g., show a user-friendly message)
  }
}

export async function uploadProfileBanner(file) {
  try {
    if (!file) {
      alert("Please choose a file first!");
      return;
    }

    const uri = await compressFile(file)

    const storageRef = ref(storage, `/user/${auth.currentUser.uid}/profile_banner.webp`);
    const uploadTask = uploadString(storageRef, uri, 'data_url');

    // Wait for the upload to complete
    await uploadTask;

    // Download URL
    const downloadURL = await getDownloadURL(storageRef);

    if (downloadURL) {
      // Update user document with the banner URL
      const userDocRef = doc(db, "users_", auth.currentUser.uid);
      await updateDoc(userDocRef, { banner: downloadURL });
    }

    return downloadURL;
  } catch (error) {
    console.error("Error uploading banner photo:", error);
    // Handle the error appropriately (e.g., show a user-friendly message)
    throw error; // Re-throw the error to allow the caller to handle it if needed
  }
}