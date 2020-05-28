import gql from 'graphql-tag'

export const GET_CART = gql`
  query {
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
        quantity
        selectedSize
      }
    }
  }
`

export const ADD_TO_CART = gql`
  mutation($productId: ID!, $selectedSize: Int!) {
    addToCart(productId: $productId, selectedSize: $selectedSize) {
      _id
    }
  }
`

export const UPDATE_CART_ITEM = gql`
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

export const REMOVE_FROM_CART = gql`
  mutation($cartItemId: ID!) {
    removeFromCart(cartItemId: $cartItemId) {
      _id
    }
  }
`
