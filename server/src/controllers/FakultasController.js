const db = require("../../db");
const tableName = require("../../db/constant/tableName");
const WebResponse = require("../utils/WebResponse");

const GetFakultas = async (req, res, next) => {
  try {
    const data = await db(tableName.fakultas).select("*");
    return WebResponse(res, 200, "Success", data);
  } catch (error) {
    return next(error);
  }
};

const CreateFakultas = async (req, res, next) => {
  const { nama_fakultas } = req.body;
  try {
    const add = await db(tableName.fakultas).insert({ nama_fakultas });
    return WebResponse(res, 201, "Created", add);
  } catch (error) {
    return next(error);
  }
};

const HapusFakultas = async (req, res, next) => {
  const { id } = req.params;
  try {
    const del = await db(tableName.fakultas).where({ id }).del();
    if (del) {
      return WebResponse(res, 200, "Deleted", del);
    }
  } catch (error) {
    return next(error);
  }
};

const UpdateFakultas = async (req, res, next) => {
  const { id, nama_fakultas } = req.body;
  try {
    const update = await db(tableName.fakultas)
      .update({
        nama_fakultas,
      })
      .where({ id });
    if (update) {
      return WebResponse(res, 200, "Updated", update);
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = { GetFakultas, CreateFakultas, HapusFakultas, UpdateFakultas };
