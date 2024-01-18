import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";

export const checkFileupload = (file) => {
  if (file) {
    if (file.size > 1000000) {
      toast("Please Upload Files smaller than 1 mb");
      return false;
    }
    if (!(file.type === "image/jpeg" || file.type === "image/png")) {
      toast("Only png, jpg, and jpeg files are allowed to upload!");
      return false;
    }
    return true;
  }
};

export const resizeFile = (file) =>
  new Promise((resolve) => {
    const targetSize = 160;

    // Get the center coordinates to crop a square portion
    const centerX = Math.floor(file.width / 2);
    const centerY = Math.floor(file.height / 2);

    // Calculate the crop area
    const startX = centerX - Math.floor(targetSize / 2);
    const startY = centerY - Math.floor(targetSize / 2);

    Resizer.imageFileResizer(file, targetSize, targetSize, 'WEBP', 75, 0, (uri) => {
      resolve(uri);
    }, 'base64', startX, startY);
  });


// Function to compress an image
export const compressFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(file, file.width, file.height, 'WEBP', 55, 0, (uri) => {
      resolve(uri);
    });
  });


export const compressFileAndExFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(file, file.width, file.height, 'WEBP', 50, 0, (uri) => {
      resolve(uri);
    }, 'file');
  });
