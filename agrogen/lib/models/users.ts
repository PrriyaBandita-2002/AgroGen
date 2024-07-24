import mongoose, { Schema, model, models } from 'mongoose';

const UserSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userType: { type: String, required: true, enum: ['farmer', 'buyer'] },
    location: { type: String },
    // Uncomment and define structure if needed
    contactInfo: { type: mongoose.Schema.Types.Mixed }
  },
  {
    timestamps: true,
  }
);

const User = models.User || model('User', UserSchema);
export default User;
