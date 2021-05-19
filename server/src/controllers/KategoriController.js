const db = require("../../db");
const tableName = require("../../db/constant/tableName");
const WebResponse = require("../utils/WebResponse");

const GetKategori = async (req, res, next) => {
  try {
    const data = await db(tableName.kategori).select("*");
    return WebResponse(res, 200, "Success", data);
  } catch (error) {
    return next(error);
  }
};

const CreateKaterori = async (req, res, next) => {
  const { kategori } = req.body;
  try {
    const add = await db(tableName.kategori).insert({ kategori });
    return WebResponse(res, 201, "Created", add);
  } catch (error) {
    return next(error);
  }
};

const HapusKategoriById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const del = await db(tableName.kategori).where({ id }).del();
    return WebResponse(res, 200, "Success", del);
  } catch (error) {
    return next(error);
  }
};

const UpdateKategori = async (req, res, next) => {
  const { id, kategori } = req.body;
  try {
    const update = await db(tableName.kategori)
      .update({
        kategori,
      })
      .where({ id });

    if (update) {
      return WebResponse(res, 200, "Updated", update);
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  GetKategori,
  CreateKaterori,
  HapusKategoriById,
  UpdateKategori,
};
