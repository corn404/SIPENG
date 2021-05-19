package com.umgo.sipeng.data.models.pengaduan



data class PengaduanListResponse(
    val code: Int,
    val status: String,
    val `data`: List<Pengaduan>
)
