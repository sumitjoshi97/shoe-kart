import { model, Schema } from 'mongoose'

const userSchema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true, min: 8 },
	profilePic: String,
	paymentId: String,
	isAdmin: { type: Boolean, default: false },
})

const User = model('User', userSchema)

export default User
