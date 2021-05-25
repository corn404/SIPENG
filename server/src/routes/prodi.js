const route = require("express").Router();
const { ProdiController } = require("../controllers");

route.get("/", ProdiController.GetProdi);
route.get("/:id_fakultas", ProdiController.GetProdiByFakultas);
route.post("/", ProdiController.CreatedProdi);

module.exports = route;
