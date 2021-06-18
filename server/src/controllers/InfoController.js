const db = require("../../db");
const tableName = require("../../db/constant/tableName");
const WebResponse = require("../utils/WebResponse");

const GetAllInfo = async (req, res, next) => {
  try {
    const totalAduan = await db(tableName.pengaduan).count("id", {
      as: "total",
    });
    const aduanDibalas = await db(tableName.pengaduan)
      .count("id", {
        as: "total",
      })
      .where({ status: 1 });
    const aduanBelumDibalas = await db(tableName.pengaduan)
      .count("id", {
        as: "total",
      })
      .where({ status: 0 });

    const totalMahasiswa = await db(tableName.mahasiswa).count("id", {
      as: "total",
    });
    const data = {
      aduan_dibalas: aduanDibalas[0].total,
      aduan_belum_dibalas: aduanBelumDibalas[0].total,
      total_aduan: totalAduan[0].total,
      total_mahasiswa: totalMahasiswa[0].total,
    };

    return WebResponse(res, 200, "Success", data);
  } catch (error) {
    return next(error);
  }
};

const GetInfoByProdi = async (req, res, next) => {
  const { id_prodi } = req.params;
  try {
    const totalAduan = await db(tableName.pengaduan)
      .count("id", {
        as: "total",
      })
      .where({ id_prodi });
    const aduanDibalas = await db(tableName.pengaduan)
      .count("id", {
        as: "total",
      })
      .where({ status: 1 })
      .where({ id_prodi });
    const aduanBelumDibalas = await db(tableName.pengaduan)
      .count("id", {
        as: "total",
      })
      .where({ status: 0 })
      .where({ id_prodi });

    const totalMahasiswa = await db(tableName.mahasiswa)
      .count("id", {
        as: "total",
      })
      .where({ id_prodi });
    const data = {
      aduan_dibalas: aduanDibalas[0].total,
      aduan_belum_dibalas: aduanBelumDibalas[0].total,
      total_aduan: totalAduan[0].total,
      total_mahasiswa: totalMahasiswa[0].total,
    };

    return WebResponse(res, 200, "Success", data);
  } catch (error) {
    return next(error);
  }
};

module.exports = { GetAllInfo, GetInfoByProdi };
