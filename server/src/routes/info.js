const route = require("express").Router();
const { InfoController } = require("../controllers");

route.get("/", InfoController.GetAllInfo);
route.get("/:id_prodi", InfoController.GetInfoByProdi);

module.exports = route;
