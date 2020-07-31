import { gql } from 'apollo-server-express'

const typeDefs = gql`
	scalar Date

	extend type Query {
		order(orderId: ID!): Order!
		orders: [Order]
	}

	extend type Mutation {
		createOrder(token: String!): Order! @isAuth(requires: USER)
	}

	type OrderItem {
		_id: ID!
		product: Product!
		quantity: Int!
		selectedSize: Int!
	}

	type Order {
		_id: ID!
		user: User!
		userInfo: UserInfo!
		quantity: Int!
		price: Int!
		items: [OrderItem]
		date: Date!
	}

	input OrderItemInput {
		product: ID!
		price: Int!
		quantity: Int!
	}
`

export default typeDefs
