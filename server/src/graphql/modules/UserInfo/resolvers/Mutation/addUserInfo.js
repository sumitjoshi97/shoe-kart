import UserInfo from '../../../../../db/models/UserInfo'

async function addUserInfo(_, args, { user }) {
  try {
    const { address } = args
    const { street, locality, city, state, landmark, contactNumber } = address
    const newUserInfo = new UserInfo({
      user: user.userId,
      address: {
        street,
        locality,
        city,
        state,
        landmark,
        contactNumber: parseInt(contactNumber),
      },
    })
    return await newUserInfo.save()
  } catch (err) {
    throw new Error(err)
  }
}

export default addUserInfo
