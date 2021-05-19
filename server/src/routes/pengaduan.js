const route = require("express").Router();
const { PengaduanController } = require("../controllers");
const { uploadPengaduan } = require("../utils/uploads");

route.get("/", PengaduanController.GetPengaduan);
route.get("/pengadu/:id_pengadu", PengaduanController.GetPengaduanByPengadu);
route.get("/:id_fakultas", PengaduanController.GetPengaduanByFakultas);
route.post(
  "/",
  uploadPengaduan.single("foto"),
  PengaduanController.CreatePengaduan
);
route.put("/balas", PengaduanController.BalasPengaduan);
route.delete("/:id", PengaduanController.HapusPengaduan);

module.exports = route;
