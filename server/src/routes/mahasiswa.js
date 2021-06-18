const route = require("express").Router();
const { MahasiswaController } = require("../controllers");
const { uploadProfile, uploadFileImport } = require("../utils/uploads");

route.get("/", MahasiswaController.GetMahasiswa);
route.put(
  "/",
  uploadProfile.single("foto"),
  MahasiswaController.updateMahasiswa
);
route.get("/fakultas/:id_fakultas", MahasiswaController.GetMahasiswaByFakultas);
route.post("/", MahasiswaController.CreateMahasiswa);
route.post("/login", MahasiswaController.LoginMahasiswa);
route.put("/reset", MahasiswaController.ResetPassword);
route.delete("/:id", MahasiswaController.HapusMahasiswa);
route.post(
  "/import",
  uploadFileImport.single("file"),
  MahasiswaController.ImportFile
);

module.exports = route;
