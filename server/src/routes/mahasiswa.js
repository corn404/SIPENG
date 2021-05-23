const route = require("express").Router();
const { MahasiswaController } = require("../controllers");

route.get("/", MahasiswaController.GetMahasiswa);
route.get("/fakultas/:id_fakultas", MahasiswaController.GetMahasiswaByFakultas);
route.post("/", MahasiswaController.CreateMahasiswa);
route.post("/login", MahasiswaController.LoginMahasiswa);
route.put("/reset", MahasiswaController.ResetPassword);
route.delete("/:id", MahasiswaController.HapusMahasiswa);

module.exports = route;
