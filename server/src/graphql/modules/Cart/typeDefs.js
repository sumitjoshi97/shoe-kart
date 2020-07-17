import { gql } from 'apollo-server-express'

const typeDefs = gql`
	extend type Query {
		cart: Cart! @isAuth(requires: USER)
	}

	extend type Mutation {
		addToCart(
			productId: ID!
			selectedSize: Int!
			quantity: Int
		): Cart @isAuth(requires: USER)
		removeFromCart(cartItemId: ID!): Cart @isAuth(requires: USER)
		updateCartItem(
			cartItemId: ID!
			quantity: Int
			selectedSize: Int
		): Cart! @isAuth(requires: USER)
		clearCart(cartItemId: ID!): Cart! @isAuth(requires: USER)
	}

	type CartItem {
		_id: ID!
		product: Product!
		quantity: Int!
		selectedSize: Int
	}

	type Cart {
		_id: ID!
		user: User!
		items: [CartItem]
		price: Int!
		quantity: Int!
	}
`

export default typeDefs
