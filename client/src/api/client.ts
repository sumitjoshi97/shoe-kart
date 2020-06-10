import ApolloClient from 'apollo-boost'

const client = new ApolloClient({
  uri: process.env.SERVER_URI + '/graphql',
  request: operation => {
    const credentials = localStorage.getItem('credentials')
    if (credentials) {
      const { token_type, access_token } = JSON.parse(credentials)
      operation.setContext({
        headers: {
          authorization: `${token_type} ${access_token}`,
        },
      })
    }
  },
})

export default client
