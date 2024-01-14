import './Feeds.css'
import FeedInput from './FeedInput'
import Posts from './Posts'

const Feeds = () => {
  return (
    <div className="Feed__container">
      <FeedInput />
      <Posts />

      {/* <div className="post__bg" style={{
        background: ' #00000085', zIndex: "9",
        position: 'absolute', top: '0', left: '0', width: '100%', height: '100vh'
      }}></div> */}
    </div>
  )
}

export default Feeds