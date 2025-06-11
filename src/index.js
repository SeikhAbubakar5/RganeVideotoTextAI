require('dotenv').config({ path: 'src/.env' });
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser')
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();

const allowedOrigins = [
  "http://localhost:5173",         
];

app.use(cors({
  credentials: true,
  ));
app.use(express.json());
app.use(cookieParser());
 app.use(bodyParser.json());


mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/video', require('./routes/videoRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes'));

const PORT = process.env.PORT || 7002;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
