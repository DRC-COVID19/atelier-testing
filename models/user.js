import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      unique: false
    },
    userName: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String
    }
  },
  { timestamps: true }
)

const User = mongoose.model('User', UserSchema)
export { User, UserSchema }
