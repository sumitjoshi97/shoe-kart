import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import ImageSlider from './ImageSlider'
import { getProduct } from './queries'
import { IProductProps } from './interface'
import { IProduct } from '~components/Results/interface'
import './styles.scss'

const Product: React.FC<IProductProps> = props => {
  const { loading, error, data } = useQuery(getProduct, {
    variables: { productId: props.match.params.productId },
  })

  let product = <div />

  const renderProduct = (product: IProduct) => (
    <>
      <div className="product__image-slider">
        <ImageSlider images={product.image} name={product.name} />
      </div>
      <div className="product__info">
        <h1 className="product__info__header">{product.name}</h1>
        <h3 className="product__info__category-gender">
          {product.category}/{product.gender}
        </h3>
        <div className="product__info__description">{product.description}</div>
        <div className="product__info__available-sizes">
          <span>available sizes: </span>
          {product.size}
        </div>
        <div className="product__info__price">${product.price}</div>
        <div className="product__info__ctas">
          <button className="product__info__ctas__add-cart">Add to cart</button>
          <button className="product__info__ctas__add-favorite">
            Add to favorite
          </button>
        </div>
      </div>
    </>
  )

  if (data && data.product) {
    product = renderProduct(data.product)
  }

  return <div className="product">{product}</div>
}

export default Product
