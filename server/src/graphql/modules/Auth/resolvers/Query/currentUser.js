import User from '../../../../../db/models/User'

async function currentUser(_, args, { user }) {
  return User.findById(user.userId)
}

export default currentUser