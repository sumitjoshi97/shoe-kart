import React from 'react'
import { RouteComponentProps } from 'react-router-dom'

import Button from '~components/shared/Button'
import ImageSlider from './ImageSlider'
import Layout from '~components/Layout'
import Loading from '~components/shared/Loading'
import Size from './Size'

import useCart from '~hooks/cart/useCart'
import useProduct from '~hooks/products/useProduct'

import { ICategory } from '~interface'
import './styles.scss'

export interface IProductProps
  extends RouteComponentProps<{ productId: string }> {}

const Product: React.FC<IProductProps> = props => {
  const { addItemToCart } = useCart()
  const {
    product,
    productLoading,
    selectedSize,
    sizeError,
    handleSizeSelection,
    handleSizeError,
  } = useProduct(props.match.params.productId)

  const renderSizes = () => {
    const sizes: ICategory[] = []

    if (product) {
      product.categories.forEach((category: ICategory) => {
        if (category.parent?.name === 'size') sizes.push(category)
      })
    }

    return sizes.map((size: ICategory) => (
      <Size
        key={size._id}
        size={size.name}
        isSizeSelected={selectedSize === size._id}
        selectSize={() => handleSizeSelection(size)}
      />
    ))
  }

  const handleCart = () => {
    handleSizeError()
    addItemToCart(product, selectedSize)
  }

  const renderProduct = () => {
    if (productLoading) {
      return <Loading />
    }
    if (product) {
      return (
        <>
          <div className="product__image-slider">
            <ImageSlider images={product.image} name={product.name} />
          </div>
          <div className="product__info">
            <div className="product__info__header">
              <h2 className="product__info__header__sub">
                {product.mainCategory.name} /{' '}
                {
                  product.categories.find(
                    (category: ICategory) => category.parent?.name === 'gender',
                  ).name
                }
                Shoe
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
                {renderSizes()}
              </div>
            </div>
            <div className="product__info__description">
              {product.description}
            </div>

            <div className="product__info__ctas">
              <Button onClick={handleCart} styles={{ flex: 1 }}>
                Add to cart
              </Button>
            </div>
          </div>
        </>
      )
    }
  }

  return (
    <Layout>
      <div className="product">{renderProduct()}</div>
    </Layout>
  )
}

export default Product
