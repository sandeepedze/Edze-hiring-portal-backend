const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

const registerRoute = require('./Auth/register');
const loginRoute = require('./Auth/login');
const restpasswordRoute=require('./Auth/resetpassword');
const forgotpasswordRoute=require('./Auth/forgotpassword');
const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', registerRoute);
app.use('/api/auth', loginRoute);
app.use('api/auth',restpasswordRoute);
app.use('api/auth',forgotpasswordRoute);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
  });
