const express = require("express");
const {httpGetAllProducts, httpRegisterNewProduct} = require("./products.controller");

const productsRouter = express.Router();

productsRouter.get("/", httpGetAllProducts);
productsRouter.post("/", httpRegisterNewProduct);

module.exports = productsRouter;