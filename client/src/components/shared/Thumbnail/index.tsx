import React from 'react'
import './styles.scss'

interface IThumbnailProps {
  img: string
  title: string
}

const Thumbnail: React.FC<IThumbnailProps> = ({ img, title }) => {
  return (
    <div className="thumbnail">
      <img className="thumbnail__img" src={img} alt={title} />
    </div>
  )
}

export default Thumbnail
