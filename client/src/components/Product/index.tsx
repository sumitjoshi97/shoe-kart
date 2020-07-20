import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import ImageSlider from './ImageSlider'
import Size from './Size'
import Button from '~components/shared/Button'
import * as queries from './queries'
import './styles.scss'
import { FiHeart } from 'react-icons/fi'
import withCart from '../../hocs/cart/withCart'

const Product: React.FC<any> = props => {
  const [sizeError, setSizeError] = useState<boolean>(false)

  const { data } = useQuery(queries.GET_PRODUCT, {
    variables: { productId: props.match.params.productId },
  })

  const [selectedSize, setSelectedSize] = useState<number>(-1)

  const handleSize = (size: number) => {
    sizeError === true && setSizeError(false)
    setSelectedSize(size !== selectedSize ? size : -1)
  }

  const renderSizes = (sizes: number[]) =>
    sizes.map((size: number) => (
      <Size
        key={size}
        size={size}
        isSizeSelected={selectedSize === size}
        selectSize={() => handleSize(size)}
      />
    ))

  const handleCart = () => {
    if (selectedSize === -1) {
      setSizeError(true)
      return
    }

    props.addItemToCart(data.product, selectedSize)
  }

  const handleFavorite = () => {
    console.log('favorite')
  }

  const renderProduct = () => {
    if (data && data.product) {
      const { product } = data
      return (
        <>
          <div className="product__image-slider">
            <ImageSlider images={product.image} name={product.name} />
          </div>
          <div className="product__info">
            <div className="product__info__header">
              <h2 className="product__info__header__sub">
                {product.category} / {product.gender} Shoe
              </h2>
              <h1 className="product__info__header__main">{product.name}</h1>
            </div>

            <div className="product__info__price">
              <div />$ {product.price}
            </div>
            <div className="product__info__sizes">
              <span style={{ color: sizeError ? '#d43f21' : '#000' }}>
                select size
              </span>
              <div
                className="product__info__sizes__selection"
                style={{ boxShadow: sizeError ? '0 0 0 1px #d43f21' : '' }}
              >
                {renderSizes(product.size)}
              </div>
            </div>
            <div className="product__info__description">
              {product.description}
            </div>

            <div className="product__info__ctas">
              <Button onClick={handleCart} styles={{ flex: 1 }}>
                Add to cart
              </Button>
              <Button
                type="white"
                styles={{ marginLeft: '1.6rem' }}
                onClick={handleFavorite}
              >
                <FiHeart size="1.6rem" />
              </Button>
            </div>
          </div>
        </>
      )
    }
  }

  return (
    <div className="product-container">
      <div className="product">{renderProduct()}</div>
    </div>
  )
}

export default withCart(Product)
