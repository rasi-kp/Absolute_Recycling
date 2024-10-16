const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/userShema');
const Task = require('../model/salesdataSchema');

module.exports = {
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      // Find user by email in MongoDB
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: 'Invalid User' });
      }
      // Compare passwords
      const isValidPassword = await bcrypt.compare(password, user.password); // Compare password
      if (!isValidPassword) {
        return res.status(400).json({ error: 'Invalid Password' });
      }
      // Issue JWT
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_USER, { expiresIn: '1h' });
      return res.status(200).json({ token, name: user.name||"null" });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
  register: async (req, res) => {
    const { email, password } = req.body; // Changed to email
    try {
      // Check for duplicate emails
      const existingUser = await User.findOne({ email }); // Use email to check for duplicates
      if (existingUser) {
        return res.status(400).json({ error: 'Email already taken' });
      }

      // Hash the password
      const password_hash = await bcrypt.hash(password, 10);

      // Create new user
      const user = new User({ email, password:password_hash }); // Use email instead of username
      await user.save(); // Save the user instance

      return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.log(error);
      
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
 
}