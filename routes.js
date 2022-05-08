const route = require("express").Router();
const { req, res } = require("express");
const {
  login,
  createUser,
  createDog,
  sacarPerro,
  devolverPerro,
} = require("./controller.js");

route.get("/login", login);
route.post("/createUser", createUser);
route.post("/createDog", createDog);
route.post("/sacarPerro", sacarPerro);
route.post("/devolverPerro", devolverPerro);
module.exports = { route };
