const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = 'mongodb+srv://Edzesoft:CEdzesoft678@cluster0.oxpgp.mongodb.net/Hiring_portal?retryWrites=true&w=majority&appName=Cluster0';

  try {
    await mongoose.connect(uri);

    console.log(' MongoDB connected successfully');
  } catch (error) {
    console.error(' MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
