// db.js
const mongoose = require('mongoose');

// Connect to MongoDB and export the connection instance
const connectToDatabase = async () => {
  const connection = await mongoose.connect("mongodb+srv://namancam9:cT8jEKGIBVKNO4BQ@cluster0.z42ryfn.mongodb.net/nasa?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return connection;
};

const disconectToDatabase = async () => {
  return await mongoose.disconnect();
};

module.exports = { connectToDatabase, disconectToDatabase };