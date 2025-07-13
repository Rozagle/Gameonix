import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: false,
  },
  image: String,
  emailVerified: Date,
  cart: [{
    gameId: String,
    title: String,
    price: Number,
    image: String,
    quantity: {
      type: Number,
      default: 1
    }
  }],
  purchaseHistory: [{
    orderId: String,
    games: [{
      gameId: String,
      title: String,
      price: Number,
      image: String,
    }],
    total: Number,
    purchaseDate: {
      type: Date,
      default: Date.now
    },
    paymentMethod: String,
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending'
    }
  }]
}, {
  timestamps: true,
})

export default mongoose.models.User || mongoose.model('User', userSchema)