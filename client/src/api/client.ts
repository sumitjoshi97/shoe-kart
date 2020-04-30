import ApolloClient from 'apollo-boost'

const client = new ApolloClient({
  uri: process.env.SERVER_URI + '/graphql',
  request: operation => {
    const token = localStorage.getItem('token')
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    })
  },
})

export default client
// import { ApolloClient } from 'apollo-client'
// import { setContext } from 'apollo-link-context'
// import { HttpLink } from 'apollo-link-http'
// import { InMemoryCache } from 'apollo-cache-inmemory'

// export const cache = new InMemoryCache()
// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = localStorage.getItem('token')
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : '',
//     },
//   }
// })
// const client = new ApolloClient({
//   cache,
//   link: new HttpLink({
//     credentials: 'include',
//     uri: process.env.SERVER_URI + '/graphql',
//   }),
// })

// export default client
