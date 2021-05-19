const express = require("express");
const route = express.Router();

route.use("/kategori", require("./kategori"));
route.use("/fakultas", require("./fakultas"));
route.use("/mahasiswa", require("./mahasiswa"));
route.use("/pengaduan", require("./pengaduan"));
route.use("/auth", require("./auth"));

module.exports = route;
