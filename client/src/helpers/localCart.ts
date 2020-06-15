interface ICart {
  [key: string]: any
}

export const getLocalCart = () => {
  return localStorage.getItem('cart')
}

export const setLocalCart = (cart: ICart) => {
  localStorage.setItem('cart', JSON.stringify(cart))
}
