import React, { useState } from 'react'

interface IImageSliderProps {
  images: string[]
  name: string
}

const ImageSlider: React.FC<IImageSliderProps> = ({ images, name }) => {
  const [currentImage, setCurrentImage] = useState(images[0])

  const currentOptionStyles = {
    borderWidth: '1.2px',
    borderStyle: 'solid',
    borderColor: '#111',
    borderRadius: '2px',
  }

  const handleSliderImage = (image: string) => {
    setCurrentImage(image)
  }

  const renderSliderOptions = (images: string[]) => {
    return images.map((image: string, index: number) => (
      <div
        className="slider-option"
        key={index}
        style={image === currentImage ? currentOptionStyles : undefined}
        onClick={() => handleSliderImage(image)}
      >
        <img src={image} />
      </div>
    ))
  }

  return (
    <div className="image-slider">
      <div className="image-slider__nav">{renderSliderOptions(images)}</div>
      <div className="image-slider__img-container">
        <img
          className="image-slider__img-container__curr-img"
          src={currentImage}
          alt={name}
        />
      </div>
    </div>
  )
}

export default ImageSlider
