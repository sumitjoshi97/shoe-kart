import { typeDef as cartAction } from './cartAction'
import { typeDef as paymentStatus } from './paymentStatus'
import { typeDef as paymentType } from './paymentType'
import { typeDef as role } from './role'

const enums = {
  typeDefs: [cartAction, paymentStatus, paymentType, role],
}

export default enums
