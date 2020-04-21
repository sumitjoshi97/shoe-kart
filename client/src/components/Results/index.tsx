import React from 'react'
import { ProductsProvider } from './products-context'

import LeftNav from './LeftNav'
import Products from './Products'
import './styles.scss'

const Results: React.FC = () => {
  return (
    <div className="results">
      <ProductsProvider>
        <LeftNav />
        <Products />
      </ProductsProvider>
    </div>
  )
}

export default Results
