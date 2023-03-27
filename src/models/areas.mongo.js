const mongoose = require("mongoose");

const areasSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
      },
    area: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model("area", areasSchema)