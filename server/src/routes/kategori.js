const route = require("express").Router();
const { KategoriController } = require("../controllers");

route.get("/", KategoriController.GetKategori);
route.post("/", KategoriController.CreateKaterori);
route.delete("/:id", KategoriController.HapusKategoriById);
route.put("/", KategoriController.UpdateKategori);

module.exports = route;
