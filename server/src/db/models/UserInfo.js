import mongoose from 'mongoose'

const userInfoSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  address: {
    street: { type: String, required: true },
    locality: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    landmark: String,
    contactNumber: { type: Number, required: true },
  },
})

const UserInfo = mongoose.model('UserInfo', userInfoSchema)

export default UserInfo
