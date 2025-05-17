const User = require('../models/Users');

exports.login = async (req, res) => {
  const { euid, password } = req.body;

  if (!euid || !password) {
    return res.status(400).json({ success: false, message: 'EUID and password are required' });
  }

  try {
    const user = await User.findOne({ euid });
    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    if (password !== user.password) {
      return res.status(401).json({ success: false, message: 'Invalid password' });
    }

    res.status(200).json({ success: true, message: 'Login successful', userId: user._id });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};