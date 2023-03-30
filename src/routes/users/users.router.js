const express = require("express");
const { httpGetAllUsers, httpAddNewUser, httpDeleteUser, httpEditUserById } = require("./users.controller");

const usersRouter = express.Router();

usersRouter.get("/", httpGetAllUsers);
usersRouter.post("/", httpAddNewUser);
usersRouter.delete("/:id", httpDeleteUser);
usersRouter.put("/:id", httpEditUserById)

module.exports = usersRouter;
