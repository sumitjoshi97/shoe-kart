import resolvers from './resolvers'
import typeDefs from './typeDefs'

const schema = {
	typeDefs: [typeDefs],
	resolvers,
}

export default schema
