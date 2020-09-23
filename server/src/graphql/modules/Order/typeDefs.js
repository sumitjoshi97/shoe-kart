import { gql } from 'apollo-server-express'

const typeDefs = gql`
	scalar Date

	extend type Query {
		order(orderId: ID!): Order!
		orders: [Order]
	}

	extend type Mutation {
		createOrder: Order! @isAuth(requires: USER)
	}

	type OrderItem {
		_id: ID!
		product: Product!
		quantity: Int!
		selectedSize: ID!
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
`

export default typeDefs
