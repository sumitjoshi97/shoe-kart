import { gql } from 'apollo-server-express'

export const typeDef = gql`
  enum Role{
    USER
    ADMIN
  }
`
