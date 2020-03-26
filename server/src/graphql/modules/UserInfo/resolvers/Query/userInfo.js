import UserInfo from '../../../../../db/models/UserInfo'

async function userInfo(_, args, { user }) {
  try {
    const userInfo = await UserInfo.findOne({ user: user.userId })
    if (userInfo) {
      return userInfo
    }
    throw new Error()
  } catch (err) {
    throw new Error('we have no user info about you')
  }
}

export default userInfo
