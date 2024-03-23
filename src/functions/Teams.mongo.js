const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    id: Number,
    name: String,
    image: Buffer,
    about: String,
    contentType: String,
});
  
module.exports  = mongoose.model("Teams", teamSchema);