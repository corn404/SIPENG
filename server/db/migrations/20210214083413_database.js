const Knex = require("knex");
const tableName = require("../constant/tableName");
/**
 *
 * @param {Knex} knex
 */

exports.up = async (knex) => {
  await knex.schema
    .createTable(tableName.users, (table) => {
      table.increments("id").notNullable();
      table.string("nama_lengkap").notNullable();
      table.string("username", 100).notNullable();
      table.text("password").notNullable();
      table.enum("role", ["admin", "user", "mahasiswa"]).notNullable();
      table
        .integer("status")
        .defaultTo(1)
        .unsigned()
        .notNullable()
        .comment("1=aktif,2=blokir");
      table.string("id_pengguna").nullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable(tableName.mahasiswa, (table) => {
      table.increments("id").notNullable();
      table.string("nim").notNullable();
      table.string("nama").notNullable();
      table.enum("kelamin", ["L", "P"]).notNullable();
      table.string("alamat").nullable();
      table.integer("id_fakultas").notNullable();
    })
    .createTable(tableName.fakultas, (table) => {
      table.increments("id").notNullable();
      table.string("nama_fakultas").notNullable();
    })
    .createTable(tableName.prodi, (table) => {
      table.increments("id").notNullable();
      table.string("nama_prodi").notNullable();
      table.integer("id_fakultas").notNullable();
    })
    .createTable(tableName.kategori, (table) => {
      table.increments("id").notNullable();
      table.string("kategori").notNullable();
    })
    .createTable(tableName.pengaduan, (table) => {
      table.increments("id").notNullable();
      table.dateTime("tgl_pengaduan").notNullable();
      table.integer("id_kategori").notNullable();
      table.integer("id_fakultas").notNullable();
      table.integer("id_pengadu").notNullable();
      table.text("keterangan").nullable();
      table.text("balasan").nullable();
      table.text("foto").notNullable();
      table
        .integer("status")
        .defaultTo(0)
        .notNullable()
        .comment("0=belum dibalas, 1=dibalas");
    });
};

/**
 *
 * @param {Knex} knex
 */

exports.down = async (knex) => {
  await knex.schema
    .dropTable(tableName.users)
    .dropTable(tableName.mahasiswa)
    .dropTable(tableName.fakultas)
    .dropTable(tableName.kategori)
    .dropTable(tableName.prodi)
    .dropTable(tableName.pengaduan);
};
