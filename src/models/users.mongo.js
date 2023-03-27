const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
      },
    user: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model("user", usersSchema)