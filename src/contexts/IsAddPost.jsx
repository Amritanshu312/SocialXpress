import { createContext, useState } from "react";

export const IsAddPostInfo = createContext();

const IsAddPostState = (props) => {
  const [isAddPost, setIsAddPost] = useState(false);

  return (
    <IsAddPostInfo.Provider value={{ isAddPost, setIsAddPost }}>
      {props.children}
    </IsAddPostInfo.Provider>
  );
};

export default IsAddPostState;
