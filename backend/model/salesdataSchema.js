const mongoose = require('mongoose');

// Define the Collection Schema
const salesdataSchema = new mongoose.Schema({
  salePersonName: {
    type: String,
    required: true,
  },
  dateOfCollection: {
    type: Date,
    required: true
  },
  clientName: {
    type: String,
    required: true,
    trim: true
  },
  clientNumber: {
    type: String,
  },
  location: {
    type: String,
    required: true
  },
  googleMapLocation: {
    type: String  // You can store a Google Maps link or coordinates
  },
  timeOfCollection: {
    type: String,
    required: true
  },
  typeOfMaterial: {
    type: String,
    required: true
  },
  noOfPallets: {
    type: Number,
    required: true
  },
  packagingType: {
    type: String,
  },
  typeOfTruck: {
    type: String,
    // enum: ['1 Ton', '3 Ton', '10 Ton', 'Trailer', 'Dumper'],
    required: true
  },
  manPowerRequired: {
    type: String,
    required: true
  },
  tooOrGatePass: {
    type: String,
    // enum: ['Yes', 'No', 'NA'],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Export the Collection model
module.exports = mongoose.model('Salesdata', salesdataSchema);
