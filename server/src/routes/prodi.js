const route = require("express").Router();
const { ProdiController } = require("../controllers");

route.get("/", ProdiController.GetProdi);
route.post("/", ProdiController.CreatedProdi);

module.exports = route;
