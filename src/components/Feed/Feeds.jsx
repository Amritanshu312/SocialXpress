import React from 'react'
import './Feeds.css'
import FeedInput from './FeedInput'
import Posts from './Posts'

const Feeds = () => {
  return (
    <div className="Feed__container">
      <FeedInput />
      <Posts />
    </div>
  )
}

export default Feeds