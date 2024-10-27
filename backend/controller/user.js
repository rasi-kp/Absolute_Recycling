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
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET_USER, { expiresIn: '30d' });
      if (user.firstLogin) {
        return res.status(200).json({token, message: 'Please change your password', firstLogin: true });
      }
      return res.status(200).json({ token, name: user.name || "null" });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
  postsales: async (req, res) => {
    try {
      const email = req.user.email;
      const {
        dateOfCollection, clientName, clientNumber, location,
        googleMapLocation, timeOfCollection, typeOfMaterial,
        noOfPallets, typeOfTruck, manPowerRequired, tooOrGatePass
      } = req.body; // Extract data
      
      if (!dateOfCollection || !clientName || !clientNumber || !location || !googleMapLocation ||
        !timeOfCollection || !typeOfMaterial || !noOfPallets || !typeOfTruck || !manPowerRequired || !tooOrGatePass) {
        return res.status(400).json({ error: 'Please fill all the fields' });
      }
      const newSalesData = new Salesdata({
        salePersonName: email,
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
      sendSalesDataEmail(newSalesData, email);
      return res.status(201).json({ message: 'Booking successfull', data: newSalesData });
    } catch (error) {
      console.error('Error saving sales data:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
  getsales: async (req, res) => {
    try {
      const userEmail = req.user.email;
      const salesData = await Salesdata.find({salePersonName:userEmail});
      return res.status(200).json({data:salesData});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
  changePassword: async (req, res) => {
    const email = req.user.email;
    const { password } = req.body;

    try {
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }
      const newPasswordHash = await bcrypt.hash(password, 10);
      user.password = newPasswordHash;
      user.firstLogin = false;
      await user.save();

      return res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
}

}