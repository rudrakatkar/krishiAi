import mongoose from 'mongoose';

const imageryAnalysisSchema = new mongoose.Schema({
  // Reference to the farm this analysis belongs to
  farm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Farm',
    required: true,
  },
  // The date the satellite imagery was captured
  date: {
    type: Date,
    required: true,
  },
  // The source of the satellite data
  source: {
    type: String,
    required: true,
    enum: ['Sentinel-2'], // Restrict to known sources
  },
  // An object to hold all calculated metrics
  metrics: {
    ndvi: {
      mean: { type: Number },
      median: { type: Number },
      min: { type: Number },
      max: { type: Number },
    },
    // You can add other metrics like NDWI here in the future
  },
  // URL to the generated map image stored in cloud storage (e.g., S3)
  mapImageURL: {
    type: String,
    required: true,
  },
}, {
  timestamps: true, // Automatically adds 'createdAt' and 'updatedAt'
});

// Compound index to speed up queries for a specific farm's data over time
imageryAnalysisSchema.index({ farm: 1, date: -1 });

const ImageryAnalysis = mongoose.model('ImageryAnalysis', imageryAnalysisSchema);

export default ImageryAnalysis;