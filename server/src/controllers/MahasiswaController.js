const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../../db");
const tableName = require("../../db/constant/tableName");
const WebResponse = require("../utils/WebResponse");

const GetMahasiswa = async (req, res, next) => {
  try {
    const data = await db(tableName.mahasiswa)
      .select(
        `${tableName.mahasiswa}.id`,
        `${tableName.mahasiswa}.nim`,
        `${tableName.mahasiswa}.nama`,
        `${tableName.mahasiswa}.kelamin`,
        `${tableName.mahasiswa}.alamat`,
        `${tableName.mahasiswa}.id_prodi`,
        `${tableName.fakultas}.nama_fakultas`,
        `${tableName.prodi}.nama_prodi`
      )
      .join(
        tableName.prodi,
        `${tableName.mahasiswa}.id_prodi`,
        `${tableName.prodi}.id`
      )
      .join(
        tableName.fakultas,
        `${tableName.prodi}.id_fakultas`,
        `${tableName.fakultas}.id`
      );
    return WebResponse(res, 200, "Success", data);
  } catch (error) {
    return next(error);
  }
};

const GetMahasiswaByFakultas = async (req, res, next) => {
  const { id_fakultas } = req.params;
  try {
    const data = await db(tableName.mahasiswa)
      .where({ id_fakultas })
      .select(
        `${tableName.mahasiswa}.id`,
        `${tableName.mahasiswa}.nim`,
        `${tableName.mahasiswa}.nama`,
        `${tableName.mahasiswa}.kelamin`,
        `${tableName.mahasiswa}.alamat`,
        `${tableName.mahasiswa}.id_prodi`,
        `${tableName.fakultas}.nama_fakultas`,
        `${tableName.prodi}.nama_prodi`
      )
      .join(
        tableName.prodi,
        `${tableName.mahasiswa}.id_prodi`,
        `${tableName.prodi}.id`
      )
      .join(
        tableName.fakultas,
        `${tableName.prodi}.id_fakultas`,
        `${tableName.fakultas}.id`
      );
    return WebResponse(res, 200, "Success", data);
  } catch (error) {
    return next(error);
  }
};

const CreateMahasiswa = async (req, res, next) => {
  const { nim, nama, kelamin, id_prodi } = req.body;
  try {
    const checkNim = await db(tableName.mahasiswa).where({ nim });

    if (checkNim.length > 0) {
      return WebResponse(res, 201, "Error", "NIM Sudah terdaftar");
    }

    const salt = await bcrypt.genSaltSync(12);
    const passwordHash = await bcrypt.hashSync(nim, salt);
    const add = await db(tableName.mahasiswa).insert({
      nim,
      nama,
      kelamin,
      id_prodi,
    });

    const createUser = await db(tableName.users).insert({
      nama_lengkap: nama,
      username: nim,
      password: passwordHash,
      role: "mahasiswa",
      id_pengguna: add[0],
    });

    if (createUser) {
      return WebResponse(res, 201, "Created", add);
    }
  } catch (error) {
    return next(error);
  }
};

const LoginMahasiswa = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const checkUser = await db(tableName.users).where({ username });

    if (checkUser.length > 0) {
      const checkPass = await bcrypt.compare(password, checkUser[0].password);
      if (checkPass) {
        const dataUser = await db(tableName.users)
          .select(
            `${tableName.users}.id_pengguna`,
            `${tableName.users}.nama_lengkap`,
            `${tableName.users}.role`,
            `${tableName.users}.status`,
            `${tableName.mahasiswa}.nim`,
            `${tableName.mahasiswa}.nama`,
            `${tableName.mahasiswa}.kelamin`,
            `${tableName.mahasiswa}.alamat`,
            `${tableName.fakultas}.nama_fakultas`
            // `${tableName.fakultas}.nama_fakultas`,
          )
          .join(
            tableName.mahasiswa,
            `${tableName.users}.id_pengguna`,
            `${tableName.mahasiswa}.id`
          )
          .join(
            tableName.prodi,
            `${tableName.mahasiswa}.id_prodi`,
            `${tableName.prodi}.id`
          )
          .join(
            tableName.fakultas,
            `${tableName.mahasiswa}.id_fakultas`,
            `${tableName.fakultas}.id`
          )
          .where({ id_pengguna: checkUser[0].id_pengguna });

        const token = await jwt.sign({ ...dataUser[0] }, "umgo123");
        return WebResponse(res, 200, "Success", token);
      } else {
        return WebResponse(
          res,
          200,
          "Error",
          "Username atau password anda salah"
        );
      }
    } else {
      return WebResponse(res, 200, "Error", "Username ini tidak terdaftar");
    }
  } catch (error) {
    return next(error);
  }
};

const ResetPassword = async (req, res, next) => {
  const { id, nim } = req.body;
  try {
    const salt = await bcrypt.genSaltSync(12);
    const password = await bcrypt.hashSync(nim, salt);
    const reset = await db(tableName.users)
      .update({
        password,
      })
      .where({ username: nim })
      .andWhere({ id_pengguna: id });
    if (reset) {
      return WebResponse(res, 200, "Updated", reset);
    }
  } catch (error) {
    return next(error);
  }
};

const HapusMahasiswa = async (req, res, next) => {
  const { id } = req.params;
  try {
    const del = await db(tableName.users)
      .where({ role: "mahasiswa" })
      .andWhere({ id_pengguna: id })
      .del();
    if (del) {
      await db(tableName.mahasiswa).where({ id }).del();
      return WebResponse(res, 200, "Deleted", del);
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  GetMahasiswa,
  CreateMahasiswa,
  LoginMahasiswa,
  ResetPassword,
  GetMahasiswaByFakultas,
  HapusMahasiswa,
};
