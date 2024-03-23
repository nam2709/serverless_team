const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    id: Number,
    name: String,
    data: Buffer,
    contentType: String,
});
  
module.exports  = mongoose.model("Image", imageSchema);