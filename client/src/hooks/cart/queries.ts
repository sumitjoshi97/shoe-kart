import gql from 'graphql-tag'

export const fetchCartQuery = gql`
  query fetchCart {
    cart {
      items {
        _id
        product {
          _id
          name
          image
          price
          size
          gender
          category
        }
        selectedSize
        quantity
      }
    }
  }
`

export const addToCartMutation = gql`
  mutation($productId: ID!, $selectedSize: Int!) {
    addToCart(productId: $productId, selectedSize: $selectedSize) {
      _id
    }
  }
`

export const updateCartItemMutation = gql`
  mutation($cartItemId: ID!, $quantity: Int, $selectedSize: Int) {
    updateCartItem(
      cartItemId: $cartItemId
      quantity: $quantity
      selectedSize: $selectedSize
    ) {
      _id
    }
  }
`

export const removeFromCartMutation = gql`
  mutation($cartItemId: ID!) {
    removeFromCart(cartItemId: $cartItemId) {
      _id
    }
  }
`
