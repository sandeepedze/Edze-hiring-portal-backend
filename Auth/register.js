const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/user');

router.post('/register', async (req, res) => {
  try {
    const { name, password, email, role } = req.body;
    console.log("Incoming registration:", { name, email, role });

    const userExist = await User.findOne({ email });
    if (userExist) {
      console.log("User already exists:", email);
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashPassword,
      role
    });

    const savedUser = await newUser.save();
    console.log("Saved user:", savedUser);

    res.status(201).json({ success: true, message: `${role} registered successfully` });

  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});



module.exports = router;
