import gql from 'graphql-tag'

export const fetchCartQuery = gql`
  query {
    cart {
      _id
      price
      quantity
      items {
        _id
        product {
          _id
          name
          image
          price
          mainCategory {
            _id
            name
          }
          categories {
            _id
            name
            parent {
              _id
              name
            }
          }
        }
        selectedSize
        quantity
      }
    }
  }
`

export const addToCartMutation = gql`
  mutation($productId: ID!, $selectedSize: ID!, $quantity: Int) {
    addToCart(
      productId: $productId
      selectedSize: $selectedSize
      quantity: $quantity
    ) {
      _id
    }
  }
`

export const updateCartItemMutation = gql`
  mutation($cartItemId: ID!, $quantity: Int, $selectedSize: ID) {
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

export const clearCartMutation = gql`
  mutation {
    clearCart {
      _id
    }
  }
`
