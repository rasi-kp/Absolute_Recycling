const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/userShema');
const Salesdata = require('../model/salesdataSchema');
const { sendSalesDataEmail } = require('../helpers/message');

module.exports = {
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      // Find user by email in MongoDB
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: 'Invalid User' });
      }
      if (user.isBlocked) {
        return res.status(403).json({ error: 'User is blocked. Please contact support.' });
      }
      // Compare passwords
      const isValidPassword = await bcrypt.compare(password, user.password); // Compare password
      if (!isValidPassword) {
        return res.status(400).json({ error: 'Invalid Password' });
      }
      // Issue JWT
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET_USER, { expiresIn: '1h' });
      return res.status(200).json({ token, name: user.name||"null" });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
  postsales : async (req, res) => {
    try {
      const { 
        dateOfCollection, clientName, clientNumber, location, 
        googleMapLocation, timeOfCollection, typeOfMaterial, 
        noOfPallets, typeOfTruck, manPowerRequired, tooOrGatePass 
      } = req.body; // Extract data
      if(!dateOfCollection || !clientName ||!clientNumber|| !location||!googleMapLocation||
         !timeOfCollection|| !typeOfMaterial||!noOfPallets|| !typeOfTruck|| !manPowerRequired|| !tooOrGatePass)
         {
          return res.status(400).json({ error: 'Please fill all the fields' });
         }
      const newSalesData = new Salesdata({
        dateOfCollection,
        clientName,
        clientNumber,
        location,
        googleMapLocation,
        timeOfCollection,
        typeOfMaterial,
        noOfPallets,
        typeOfTruck,
        manPowerRequired,
        tooOrGatePass
      });
      await newSalesData.save();
      const email = req.user.email;
      sendSalesDataEmail(newSalesData,email);
      return res.status(201).json({ message: 'Sales data recorded successfully', data: newSalesData });
    } catch (error) {
      console.error('Error saving sales data:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
}