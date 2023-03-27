const mongoose = require("mongoose");

const productsSchema = mongoose.Schema({
    id: {
      type: Number,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    registrationDate: {
      type: Date,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    area: {
        type: String,
        required: true,
      },
    active: {
      type: Boolean,
      required: true,
    },
  })

  module.exports = mongoose.model("product", productsSchema)