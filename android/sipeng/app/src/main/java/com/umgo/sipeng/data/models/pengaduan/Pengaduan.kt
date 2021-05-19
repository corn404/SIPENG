package com.umgo.sipeng.data.models.pengaduan

data class Pengaduan(
    val id: Int,
    val tgl_pengaduan: String,
    val id_kategori: Int,
    val id_fakultas: Int,
    val id_pengadu: Int,
    val keterangan: String,
    val nama_fakultas: String,
    val kategori: String,
    val balasan: String,
    val foto: String
)