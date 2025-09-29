import mongoose from 'mongoose';
const { Schema } = mongoose;

const predictionSchema = new Schema({
  status: {
    type: String,
    required: true,
    enum: ['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED'],
    default: 'PENDING',
  },
  satelliteData: {
    ndvi: { type: Number },
    moisture: { type: Number },
    bsi: { type: Number },
  },
  micronutrients: {
    nitrogen: { type: Number },
    phosphorus: { type: Number },
    potassium: { type: Number },
  },
  predictedYield: {
    type: Number,
  },
  modelVersion: {
    type: String,
    default: '1.0.0'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const fieldSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Field name is required.'],
    trim: true,
  },
  geometry: {
    type: {
      type: String,
      enum: ['Polygon'],
      required: true,
    },
    coordinates: {
      type: [[[Number]]],
      required: true,
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  predictions: [predictionSchema],
}, {
  timestamps: true,
});

fieldSchema.index({ geometry: '2dsphere' });

const Field = mongoose.model('Field', fieldSchema);

export default Field;

