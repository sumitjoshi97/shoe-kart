import { gql, SchemaDirectiveVisitor, AuthenticationError } from 'apollo-server-express'
import { defaultFieldResolver } from 'graphql'

const typeDef = gql`
  directive @isAuth(requires: Role!) on FIELD_DEFINITION
`

class isAuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const requiredRole = this.args.requires
    const { resolve = defaultFieldResolver } = field
    field.resolve = function (...args) {
      const context = args[2]
      const user = context.user

      if (!context || !user || !user.userId || user.role !== requiredRole) {
        throw new AuthenticationError('You are not authorized')
      }

      return resolve.apply(this, args)
    }
  }
}
const isAuth = {
  typeDef,
  directive: isAuthDirective
}

export default isAuth