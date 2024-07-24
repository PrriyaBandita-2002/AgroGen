import mongoose, { Schema, Document ,model, models} from 'mongoose';

export interface Crop extends Document {
  name: string;
  category: string;
  quantity: number;
  price: number;
}

const CropSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
} ,{
  timestamps: true,
}
);

const Crop= models.Crop ||model('Crop', CropSchema);

export default Crop;