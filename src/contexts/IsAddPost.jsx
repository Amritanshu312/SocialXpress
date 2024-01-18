import { createContext, useState } from "react"

export const isAddPostInfo = createContext()

const IsAddPostState = (props) => {
  const [isAddPost, setIsAddPost] = useState(false)

  isAddPost ? document.title = "SocialXPress - Add posts" : document.title = "SocialXPress - A Fully Fleged facebook clone"

  return (
    <isAddPostInfo.Provider value={{ isAddPost, setIsAddPost }}>
      {props.children}
    </isAddPostInfo.Provider>
  )
}

export default IsAddPostState