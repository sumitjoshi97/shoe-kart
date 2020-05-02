import React from 'react'
import { Link } from 'react-router-dom'
import Button from '~components/shared/Button'

const Hero: React.FC = () => (
  <div className="hero">
    <div className="hero__info">
      <h2 className="hero__info__header">Shoes that can lead you</h2>
      <p className="hero__info__text">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi nesciunt
        minus eligendi? Inventore nobis tempore eius sed, ullam fugiat cum rem
        reprehenderit aliquid soluta atque minima maxime officia culpa iure!
      </p>
      <Button className="hero__info__shop-btn white-btn">
        <Link className="hero__info__shop-btn__link" to="/results">
          Shop now
        </Link>
      </Button>
    </div>
  </div>
)

export default Hero
