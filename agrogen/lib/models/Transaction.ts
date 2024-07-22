import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  cropId: { type: mongoose.Schema.Types.ObjectId, ref: 'Crop', required: true },
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  transactionDate: { type: Date, required: true },
  deliveryStatus: { type: String, required: true, enum: ['pending', 'completed'] }
});

export default mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);
