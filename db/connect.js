const mongoose = require("mongoose");

const connectionString = SECRET GOES HERE;

const connectDB = (url) => {
  return mongoose.connect(connectionString,
    {useNewUrlParser: true, useUnifiedTopology: true});
};

module.exports = connectDB;
