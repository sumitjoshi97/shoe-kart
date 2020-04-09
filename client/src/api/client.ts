import ApolloClient from 'apollo-boost'

const client = new ApolloClient({
  uri: process.env.SERVER_URI + '/graphql',
})

export default client
