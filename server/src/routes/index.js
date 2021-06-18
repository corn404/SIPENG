const express = require("express");
const route = express.Router();

route.use("/kategori", require("./kategori"));
route.use("/fakultas", require("./fakultas"));
route.use("/mahasiswa", require("./mahasiswa"));
route.use("/pengaduan", require("./pengaduan"));
route.use("/prodi", require("./prodi"));
route.use("/auth", require("./auth"));
route.use("/info", require("./info"));

module.exports = route;
