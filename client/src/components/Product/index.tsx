import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import ImageSlider from './ImageSlider'
import Size from './Size'
import Button from '~components/shared/Button'
import { IProductProps } from './interface'
import * as queries from './queries'
import './styles.scss'
import { FiHeart } from 'react-icons/fi'

const Product: React.FC<IProductProps> = props => {
  const { data } = useQuery(queries.getProduct, {
    variables: { productId: props.match.params.productId },
  })
  const [addToCart] = useMutation(queries.addToCart)
  const [selectedSize, setSelectedSize] = useState<number[]>([])

  const handleSize = (size: number) => {
    const sizeIndex = selectedSize.indexOf(size)
    if (sizeIndex > -1) {
      setSelectedSize(
        selectedSize
          .slice(0, sizeIndex)
          .concat(selectedSize.slice(sizeIndex + 1)),
      )
    } else {
      setSelectedSize([...selectedSize, size])
    }
  }

  const renderSizes = (sizes: number[]) =>
    sizes.map((size: number) => (
      <Size
        key={size}
        size={size}
        isSizeSelected={selectedSize.includes(size)}
        selectSize={() => handleSize(size)}
      />
    ))

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
              <span>select size:</span>
              <div className="product__info__sizes__selection">
                {renderSizes(product.size)}
              </div>
            </div>
            <div className="product__info__description">
              {product.description}
            </div>

            <div className="product__info__ctas">
              <Button
                onClick={() =>
                  addToCart({
                    variables: { productId: props.match.params.productId },
                  })
                }
                styles={{ flex: 1 }}
              >
                Add to cart
              </Button>
              <Button
                className="white-btn"
                onClick={() => console.log('fav')}
                name="Favorite"
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

export default Product
