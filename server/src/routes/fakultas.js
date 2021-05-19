const route = require("express").Router();
const { FakultasController } = require("../controllers");

route.get("/", FakultasController.GetFakultas);
route.post("/", FakultasController.CreateFakultas);
route.delete("/:id", FakultasController.HapusFakultas);
route.put("/", FakultasController.UpdateFakultas);

module.exports = route;
