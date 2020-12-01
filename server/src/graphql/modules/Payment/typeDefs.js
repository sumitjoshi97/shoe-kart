import { gql } from 'apollo-server-express'

const typeDefs = gql`
	extend type Query {
		paymentMethods: [PaymentMethod] @isAuth(requires: USER)
	}

	extend type Mutation {
		createPaymentIntent: PaymentIntent! @isAuth(requires: USER)
		chargeUserCard: PaymentIntent! @isAuth(requires: USER)
	}

	type PaymentIntent {
		id: ID!
		clientSecret: ID!
	}

	type PaymentMethod {
		id: ID!
		card: Card!
	}

	type Card {
		brand: String!
		expMonth: Int!
		expYear: Int!
		fingerprint: ID!
		funding: String!
		lastDigits: String!
	}
`

export default typeDefs
