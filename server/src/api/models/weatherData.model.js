import mongoose from 'mongoose';

const weatherDataSchema = new mongoose.Schema({
  // Reference to the farm this weather data belongs to
  farm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Farm',
    required: true,
  },
  // The exact timestamp of the weather measurement
  timestamp: {
    type: Date,
    required: true,
  },
  temperature: {
    type: Number, // In Celsius
    required: true,
  },
  humidity: {
    type: Number, // As a percentage
    required: true,
  },
  precipitation: {
    type: Number, // In millimeters (mm)
    default: 0,
  },
  // The source of the weather data (e.g., the API provider)
  source: {
    type: String,
    required: true,
  },
}, {
  timestamps: true, // Automatically adds 'createdAt' and 'updatedAt'
});

// Compound index for efficient time-series weather queries
weatherDataSchema.index({ farm: 1, timestamp: -1 });

const WeatherData = mongoose.model('WeatherData', weatherDataSchema);

export default WeatherData;