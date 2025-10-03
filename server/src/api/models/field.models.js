import mongoose from 'mongoose';

const farmSchema = new mongoose.Schema({
  // Reference to the user who owns this farm
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // This creates the link to the 'User' model
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  // GeoJSON object for storing the farm's boundary
  boundary: {
    type: {
      type: String,
      enum: ['Polygon'], // The type must always be 'Polygon'
      required: true,
    },
    coordinates: {
      type: [[[Number]]], // Array of linear ring coordinate arrays
      required: true,
    },
  },
}, {
  // Automatically adds 'createdAt' and 'updatedAt' fields
  timestamps: true,
});

// Create a 2dsphere index on the boundary field for geospatial queries
farmSchema.index({ boundary: '2dsphere' });

const Farm = mongoose.model('Farm', farmSchema);

export default Farm;

