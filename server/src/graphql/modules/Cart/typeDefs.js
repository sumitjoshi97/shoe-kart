import { gql } from 'apollo-server-express'

const typeDefs = gql`
	extend type Query {
		cart: Cart! @isAuth(requires: USER)
	}

	extend type Mutation {
		addToCart(productId: ID!): Cart @isAuth(requires: USER)
		removeFromCart(productId: ID!): Cart @isAuth(requires: USER)
		updateCart(
			productId: ID!
			action: CartAction!
			quantity: Int
		): Cart! @isAuth(requires: USER)
	}

	type CartItem {
		product: Product!
		quantity: Int!
		price: Int!
	}

	type Cart {
		_id: ID!
		user: User!
		items: [CartItem]
	}
`

export default typeDefs
