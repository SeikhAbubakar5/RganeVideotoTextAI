const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signup = async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) return res.status(400).json({ message: 'User already exists' });
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, passwordHash });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  res.cookie('authToken', token, { httpOnly: true }).json({ message: 'Signup successful' });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ message: 'Invalid credentials' });
  const isMatch = await bcrypt.compare(password, user.passwordHash);
  
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

  res.cookie('authToken', token, { httpOnly: true }).json({ message: 'Login successful' });
};

const logout = (req, res) => {
  res.clearCookie('authToken').json({ message: 'Logged out' });
};
module.exports={signup ,login,logout}