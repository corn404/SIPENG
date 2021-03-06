const db = require("../../db");
const tableName = require("../../db/constant/tableName");
const WebResponse = require("../utils/WebResponse");

const CreatedProdi = async (req, res, next) => {
  const { nama_prodi, id_fakultas } = req.body;
  try {
    const add = await db(tableName.prodi).insert({
      nama_prodi,
      id_fakultas,
    });

    if (add) {
      return WebResponse(res, 201, "Created", add);
    }
  } catch (error) {
    return next(error);
  }
};

const GetProdi = async (req, res, next) => {
  try {
    const get = await db(tableName.prodi)
      .select(
        `${tableName.prodi}.id`,
        `${tableName.prodi}.nama_prodi`,
        `${tableName.prodi}.id_fakultas`,
        `${tableName.fakultas}.nama_fakultas`
      )
      .join(
        tableName.fakultas,
        `${tableName.prodi}.id_fakultas`,
        `${tableName.fakultas}.id`
      );

    return WebResponse(res, 200, "Success", get);
  } catch (error) {
    return next(error);
  }
};

const GetProdiByFakultas = async (req, res, next) => {
  const { id_fakultas } = req.params;
  try {
    const data = await db(tableName.prodi)
      .select(
        `${tableName.prodi}.id`,
        `${tableName.prodi}.nama_prodi`,
        `${tableName.prodi}.id_fakultas`,
        `${tableName.fakultas}.nama_fakultas`
      )
      .join(
        tableName.fakultas,
        `${tableName.prodi}.id_fakultas`,
        `${tableName.fakultas}.id`
      )
      .where({ id_fakultas });

    return WebResponse(res, 200, "Success", data);
  } catch (error) {
    return next(error);
  }
};

const UpdateProdi = async (req, res, next) => {
  const { id, nama_prodi, id_fakultas } = req.body;
  try {
    const update = await db(tableName.prodi)
      .update({
        nama_prodi,
        id_fakultas,
      })
      .where({ id });

    if (update) {
      return WebResponse(res, 201, "Updated");
    }
  } catch (error) {
    return next(error);
  }
};

const HapusProdi = async (req, res, next) => {
  const { id } = req.params;
  try {
    const del = await db(tableName.prodi).where({ id }).del();
    if (del) {
      return WebResponse(res, 200, "Deleted");
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  CreatedProdi,
  GetProdi,
  GetProdiByFakultas,
  UpdateProdi,
  HapusProdi,
};
