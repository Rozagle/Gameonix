import mongoose from 'mongoose'

const gameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  originalPrice: Number,
  discount: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    required: true,
    enum: ['action', 'adventure', 'rpg', 'strategy', 'racing', 'sports', 'simulation', 'puzzle', 'horror', 'multiplayer']
  },
  platform: [{
    type: String,
    enum: ['pc', 'playstation', 'xbox', 'nintendo', 'mobile']
  }],
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  reviewCount: {
    type: Number,
    default: 0,
  },
  images: [String],
  featured: {
    type: Boolean,
    default: false,
  },
  popular: {
    type: Boolean,
    default: false,
  },
  newRelease: {
    type: Boolean,
    default: false,
  },
  requirements: {
    minimum: {
      os: String,
      processor: String,
      memory: String,
      graphics: String,
      storage: String,
    },
    recommended: {
      os: String,
      processor: String,
      memory: String,
      graphics: String,
      storage: String,
    }
  },
  releaseDate: Date,
  developer: String,
  publisher: String,
  tags: [String],
}, {
  timestamps: true,
})

export default mongoose.models.Game || mongoose.model('Game', gameSchema)