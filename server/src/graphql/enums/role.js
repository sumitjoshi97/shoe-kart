import { gql } from 'apollo-server-express'

const typeDef = gql`
  enum Role{
    USER
    ADMIN
  }
`

export default typeDef