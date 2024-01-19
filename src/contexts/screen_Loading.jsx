import { createContext, useState } from "react"

export const ScreenLoadingInfo = createContext()

const ScreenLoadingState = (props) => {
  const [ScreenLoading, setScreenLoading] = useState(false)

  return (
    <ScreenLoadingInfo.Provider value={{ ScreenLoading, setScreenLoading }}>
      {props.children}
    </ScreenLoadingInfo.Provider>
  )
}

export default ScreenLoadingState