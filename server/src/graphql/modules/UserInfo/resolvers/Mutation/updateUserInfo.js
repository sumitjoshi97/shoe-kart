import UserInfo from '../../../../../db/models/UserInfo'

async function updateUserInfo(_, args, { user }) {
  try {
    const userInfo = await UserInfo.findOne({ user: user.userId })
    if (userInfo) {
      const fields = [
        'contactNumber',
        'street',
        'locality',
        'city',
        'state',
        'landmark',
      ]

      for (let field of fields) {
        if (
          args.address[field] &&
          args.address[field] !== userInfo.address[field]
        ) {
          userInfo.address[field] = args.address[field]
        }
      }
      const updatedUserInfo = await userInfo.save()
      return updatedUserInfo
    }
  } catch (err) {
    throw new Error('we cant update your user info try again')
  }
}

export default updateUserInfo
