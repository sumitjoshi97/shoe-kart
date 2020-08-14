import { gql } from 'apollo-server-express'

const typeDefs = gql`
	extend type Query {
		products(main_category: ID, categories: [ID]): [Product]
		product(productId: ID!): Product
	}

	extend type Mutation {
		addProduct(
			name: String!
			image: [String!]
			main_category: ID!
			categories: [ID]!
			description: String!
			price: Int!
		): Product @isAuth(requires: ADMIN)

		removeProduct(_id: ID!): Product @isAuth(requires: ADMIN)
	}

	type Product {
		_id: ID!
		name: String!
		image: [String!]
		main_category: Category!
		categories: [Category!]!
		description: String!
		price: Int!
	}
`

export default typeDefs
