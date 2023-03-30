const express = require("express");
const {
  httpGetAllProducts,
  httpRegisterNewProduct,
  httpEditProductById,
} = require("./products.controller");

const productsRouter = express.Router();

productsRouter.get("/", httpGetAllProducts);
productsRouter.post("/", httpRegisterNewProduct);
productsRouter.put("/:id", httpEditProductById);

module.exports = productsRouter;
