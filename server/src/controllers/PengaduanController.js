const moment = require("moment");
const db = require("../../db");
const tableName = require("../../db/constant/tableName");
const WebResponse = require("../utils/WebResponse");

const GetPengaduan = async (req, res, next) => {
  try {
    const data = await db(tableName.pengaduan)
      .select(
        `${tableName.pengaduan}.id`,
        `${tableName.pengaduan}.tgl_pengaduan`,
        `${tableName.fakultas}.id as id_fakultas`,
        `${tableName.fakultas}.nama_fakultas`,
        `${tableName.pengaduan}.id_kategori`,
        `${tableName.kategori}.kategori`,
        `${tableName.pengaduan}.keterangan`,
        `${tableName.pengaduan}.balasan`,
        `${tableName.pengaduan}.foto`,
        `${tableName.pengaduan}.status`,
        `${tableName.prodi}.nama_prodi`,
        `${tableName.mahasiswa}.nim`,
        `${tableName.mahasiswa}.nama`
      )
      .join(
        tableName.mahasiswa,
        `${tableName.pengaduan}.nim`,
        `${tableName.mahasiswa}.nim`
      )
      .join(
        tableName.prodi,
        `${tableName.pengaduan}.id_prodi`,
        `${tableName.prodi}.id`
      )
      .join(
        tableName.fakultas,
        `${tableName.prodi}.id_fakultas`,
        `${tableName.fakultas}.id`
      )
      .join(
        tableName.kategori,
        `${tableName.pengaduan}.id_kategori`,
        `${tableName.kategori}.id`
      )
      .orderBy(`${tableName.pengaduan}.id`, "desc");

    return WebResponse(res, 200, "Success", data);
  } catch (error) {
    return next(error);
  }
};

const GetPengaduanByPengadu = async (req, res, next) => {
  const { id_pengadu } = req.params;
  console.log(id_pengadu);
  try {
    const data = await db(tableName.pengaduan)
      .select(
        `${tableName.pengaduan}.id`,
        `${tableName.pengaduan}.tgl_pengaduan`,
        `${tableName.fakultas}.id as id_fakultas`,
        `${tableName.fakultas}.nama_fakultas`,
        `${tableName.pengaduan}.id_kategori`,
        `${tableName.kategori}.kategori`,
        `${tableName.pengaduan}.keterangan`,
        `${tableName.pengaduan}.balasan`,
        `${tableName.pengaduan}.foto`,
        `${tableName.pengaduan}.status`,
        `${tableName.pengaduan}.nim`,
        `${tableName.prodi}.nama_prodi`,
        `${tableName.mahasiswa}.nama`
      )
      .join(
        tableName.mahasiswa,
        `${tableName.pengaduan}.nim`,
        `${tableName.mahasiswa}.nim`
      )
      .join(
        tableName.prodi,
        `${tableName.pengaduan}.id_prodi`,
        `${tableName.prodi}.id`
      )
      .join(
        tableName.fakultas,
        `${tableName.prodi}.id_fakultas`,
        `${tableName.fakultas}.id`
      )
      .join(
        tableName.kategori,
        `${tableName.pengaduan}.id_kategori`,
        `${tableName.kategori}.id`
      )
      .where(`${tableName.pengaduan}.nim`, id_pengadu);
    return WebResponse(res, 200, "Success", data);
  } catch (error) {
    return next(error);
  }
};

const GetPengaduanByFakultas = async (req, res, next) => {
  const { id_fakultas } = req.params;
  try {
    const data = await db(tableName.pengaduan)
      .select(
        `${tableName.pengaduan}.id`,
        `${tableName.pengaduan}.tgl_pengaduan`,
        `${tableName.fakultas}.id as id_fakultas`,
        `${tableName.fakultas}.nama_fakultas`,
        `${tableName.pengaduan}.id_kategori`,
        `${tableName.kategori}.kategori`,
        `${tableName.pengaduan}.keterangan`,
        `${tableName.pengaduan}.balasan`,
        `${tableName.pengaduan}.foto`,
        `${tableName.pengaduan}.status`,
        `${tableName.prodi}.nama_prodi`,
        `${tableName.mahasiswa}.nim`,
        `${tableName.mahasiswa}.nama`
      )
      .join(
        tableName.mahasiswa,
        `${tableName.pengaduan}.nim`,
        `${tableName.mahasiswa}.nim`
      )
      .join(
        tableName.prodi,
        `${tableName.pengaduan}.id_prodi`,
        `${tableName.prodi}.id`
      )
      .join(
        tableName.fakultas,
        `${tableName.prodi}.id_fakultas`,
        `${tableName.fakultas}.id`
      )
      .join(
        tableName.kategori,
        `${tableName.pengaduan}.id_kategori`,
        `${tableName.kategori}.id`
      )
      .where({ id_fakultas });
    return WebResponse(res, 200, "Success", data);
  } catch (error) {
    return next(error);
  }
};

const CreatePengaduan = async (req, res, next) => {
  const { id_kategori, id_prodi, nim, keterangan } = req.body;
  try {
    await db(tableName.pengaduan).insert({
      tgl_pengaduan: moment().format("yyyy-MM-DD"),
      id_kategori,
      id_prodi,
      nim,
      keterangan,
      foto: req.file.filename,
    });

    // console.log(add);
    req.io.sockets.emit("add-pengaduan", "add-pengaduan");
    return WebResponse(res, 201, "Created", "Success");
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const BalasPengaduan = async (req, res, next) => {
  const { id, balasan } = req.body;
  try {
    const balas = await db(tableName.pengaduan)
      .update({
        balasan,
        status: 1,
      })
      .where({ id });

    if (balasan) {
      return WebResponse(res, 200, "Updated", balas);
    }
  } catch (error) {
    return next(error);
  }
};

const HapusPengaduan = async (req, res, next) => {
  const { id } = req.params;
  try {
    const del = await db(tableName.pengaduan).where({ id }).del();
    if (del) {
      return WebResponse(res, 200, "Deleted", del);
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  GetPengaduan,
  CreatePengaduan,
  GetPengaduanByFakultas,
  GetPengaduanByPengadu,
  BalasPengaduan,
  HapusPengaduan,
};
