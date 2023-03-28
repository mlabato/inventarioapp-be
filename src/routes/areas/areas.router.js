const express = require("express");
const {
  httpGetAllAreas,
  httpAddNewArea,
  httpDeleteArea,
} = require("./areas.controller");

const areasRouter = express.Router();

areasRouter.get("/", httpGetAllAreas);
areasRouter.post("/", httpAddNewArea);
areasRouter.delete("/:id", httpDeleteArea);

module.exports = areasRouter;
