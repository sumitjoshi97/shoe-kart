import { useState } from 'react'
import { useQuery } from 'react-apollo'

import { fetchProduct } from './queries'
import isEmpty from '~helpers/isEmpty'
import { ICategory } from '~interface'

const useProduct = (productId: string) => {
  const [sizeError, setSizeError] = useState<boolean>(false)
  const [selectedSize, setSelectedSize] = useState<string>('')

  const { loading: productLoading, data: productData } = useQuery(
    fetchProduct,
    {
      variables: {
        productId: productId,
      },
    },
  )

  const handleSizeSelection = (size: ICategory) => {
    if (sizeError) setSizeError(false)
    setSelectedSize(size._id !== selectedSize ? size._id : '')
  }

  const handleSizeError = () => {
    if (isEmpty(selectedSize)) {
      return setSizeError(true)
    }
    return setSizeError(false)
  }

  return {
    product: productData ? productData.product : null,
    productLoading,
    selectedSize,
    sizeError,
    handleSizeSelection,
    handleSizeError,
  }
}

export default useProduct
