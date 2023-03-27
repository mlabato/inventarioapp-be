const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const productsRouter = require("../src/routes/products/products.router")

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
}));
app.use(morgan('combined'));

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use("/products", productsRouter )

module.exports = app;