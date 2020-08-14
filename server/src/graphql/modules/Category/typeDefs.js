import { gql } from 'apollo-server-express'

const typeDefs = gql`
	extend type Query {
		categories: [Category]
	}

	extend type Mutation {
		addCategory(name: String!, parent: ID, ancestors: [ID]): [Category]!
		updateCategory(name: String!, parent: ID!, ancestors: [ID]): [Category]!
		removeCategory(name: String!, parent: ID!, ancestors: [ID]): [Category]!
	}

	type Category {
		_id: ID!
		name: String!
		parent: Category
		ancestors: [Category]
	}
`

export default typeDefs
