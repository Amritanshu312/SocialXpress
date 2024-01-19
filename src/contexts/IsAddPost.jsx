import { createContext, useState } from "react";

export const isAddPostInfo = createContext();

const IsAddPostState = (props) => {
  const [isAddPost, setIsAddPost] = useState(false);

  return (
    <isAddPostInfo.Provider value={{ isAddPost, setIsAddPost }}>
      {props.children}
    </isAddPostInfo.Provider>
  );
};

export default IsAddPostState;
