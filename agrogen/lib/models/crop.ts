import mongoose, { Schema,model,models } from 'mongoose';

const CropSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  cropName: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  harvestDate: { type: Date, required: true },
  soilQuality: { type: String },
  weatherConditions: { type: String }
});

export default mongoose.models.Crop || mongoose.model('Crop', CropSchema);
