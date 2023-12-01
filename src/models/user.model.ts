import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}

const userSchema = new Schema({
  username: { type: String },
  email: {type: String, required: true, unique: true},
  password: { type: String, required: true },
  role: {type: String, default: 'User'},
  image: {type: String},
  accessToken: {type: String},
  refreshToken: {type: String}
});

export default mongoose.model<IUser>('User', userSchema);
