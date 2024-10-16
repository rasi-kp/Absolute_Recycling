const mongoose = require('mongoose');

// Define the Admin Schema
const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Export the Admin model
module.exports = mongoose.model('Admin', adminSchema);
