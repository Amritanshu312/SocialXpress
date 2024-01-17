import './Feeds.css'
import FeedInput from './FeedInput'
import Posts from './Posts'
import { useContext, useEffect } from 'react'
import { ScreenLoadingInfo } from '../../contexts/screen_Loading'
import { isAddPostInfo } from '../../contexts/IsAddPost'

const Feeds = () => {
  const { isAddPost, setIsAddPost } = useContext(isAddPostInfo)
  const { setScreenLoading } = useContext(ScreenLoadingInfo)
  useEffect(() => setScreenLoading(false), [])

  return (
    <div className="Feed__container">
      <FeedInput addpost={isAddPost} />
      <Posts />

      {isAddPost && <div className="post__bg" style={{ background: ' #00000085', zIndex: "9", cursor: 'pointer', position: 'fixed', top: '0', left: '0', width: '100%', height: '100vh' }} onClick={() => setIsAddPost(false)}></div>}
    </div>
  )
}

export default Feeds