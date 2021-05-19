package com.umgo.sipeng.data.models.kategori

data class KategoriResponse(
    val code: Int,
    val status: String,
    val `data`: List<Kategori>
)
