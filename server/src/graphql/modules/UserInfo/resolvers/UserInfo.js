import User from '../../../../db/models/User'

const UserInfo = {
  user: async userInfo => {
    return await User.findById(userInfo.user)
  },
}

export default UserInfo
