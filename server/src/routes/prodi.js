const route = require("express").Router();
const { ProdiController } = require("../controllers");

route.get("/", ProdiController.GetProdi);
route.put("/", ProdiController.UpdateProdi);
route.get("/:id_fakultas", ProdiController.GetProdiByFakultas);
route.post("/", ProdiController.CreatedProdi);
route.delete("/:id", ProdiController.HapusProdi);

module.exports = route;
