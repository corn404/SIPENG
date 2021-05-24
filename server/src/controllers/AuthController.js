const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../../db");
const tableName = require("../../db/constant/tableName");
const WebResponse = require("../utils/WebResponse");

const GetUsers = async (req, res, next) => {
  try {
    const data = await db(tableName.users)
      .select(
        `${tableName.users}.id`,
        `${tableName.users}.nama_lengkap`,
        `${tableName.users}.username`,
        `${tableName.users}.role`,
        `${tableName.users}.id_pengguna`
      )
      .whereNot("role", "mahasiswa");
    return WebResponse(res, 200, "Success", data);
  } catch (error) {
    return next(error);
  }
};

const UserLogin = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const checkUsername = await db(tableName.users).where({ username });
    if (checkUsername.length > 0) {
      const checkPassword = await bcrypt.compare(
        password,
        checkUsername[0].password
      );
      if (checkPassword) {
        switch (checkUsername[0].role) {
          case "admin": {
            const dataAdmin = {
              uuid: checkUsername[0].uuid,
              nama_lengkap: checkUsername[0].nama_lengkap,
              username: checkUsername[0].username,
              role: checkUsername[0].role,
            };
            const adminToken = await jwt.sign({ ...dataAdmin }, "umgo123");
            return WebResponse(res, 200, "Success", adminToken);
          }

          case "user": {
            const dataUser = await db(tableName.users)
              .where({ role: "user" })
              .andWhere({ username })
              .select(
                `${tableName.users}.id`,
                `${tableName.users}.nama_lengkap`,
                `${tableName.users}.username`,
                `${tableName.users}.role`,
                `${tableName.users}.id_pengguna`,
                `${tableName.fakultas}.id as id_fakultas`,
                `${tableName.fakultas}.nama_fakultas`,
                `${tableName.prodi}.id as id_prodi`,
                `${tableName.prodi}.nama_prodi`
              )
              .join(
                tableName.prodi,
                `${tableName.users}.id_pengguna`,
                `${tableName.prodi}.id`
              )
              .join(
                tableName.fakultas,
                `${tableName.users}.id_pengguna`,
                `${tableName.fakultas}.id`
              );

            const userToken = await jwt.sign({ ...dataUser[0] }, "umgo123");
            return WebResponse(res, 200, "Success", userToken);
          }

          default:
            return WebResponse(
              res,
              200,
              "Error",
              "Username ini tidak terdaftar"
            );
            break;
        }
      } else {
        return WebResponse(
          res,
          200,
          "Error",
          "Username atau password anda salah!"
        );
      }
    } else {
      return WebResponse(res, 200, "Error", "Username ini tidak terdaftar");
    }
  } catch (error) {
    return next(error);
  }
};

const UserRegister = async (req, res, next) => {
  const { username, password, role, nama_lengkap, id_pengguna } = req.body;
  try {
    const salt = await bcrypt.genSaltSync(12);
    const hashPassword = await bcrypt.hashSync(password, salt);

    const checkUsername = await db(tableName.users).where({ username });

    if (checkUsername.length > 0) {
      return WebResponse(res, 200, "Error", "Username ini sudah terdaftar");
    }

    const userRegis = await db(tableName.users).insert({
      nama_lengkap,
      username,
      password: hashPassword,
      role,
      id_pengguna,
    });

    if (userRegis) {
      return WebResponse(res, 201, "Registered", userRegis);
    }
  } catch (error) {
    return next(error);
  }
};

const UpdateUser = async (req, res, next) => {
  const { uuid, username, password, role, nama_lengkap, id_pengguna } =
    req.body;
  try {
    const salt = await bcrypt.genSaltSync(12);
    const hashPassword = await bcrypt.hashSync(password, salt);

    const update = await db(tableName.users)
      .update({
        nama_lengkap,
        username,
        password: hashPassword,
        role,
        id_pengguna,
      })
      .where({ uuid });

    return WebResponse(res, 201, "Updated", update);
  } catch (error) {
    return next(error);
  }
};

const HapusUser = async (req, res, next) => {
  const { uuid } = req.params;
  try {
    const del = await db(tableName.users).where({ uuid }).del();
    console.log(del);
    if (del) {
      return WebResponse(res, 200, "Deleted", del);
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = { GetUsers, UserLogin, UserRegister, UpdateUser, HapusUser };
