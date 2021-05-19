package com.umgo.sipeng.data.models.fakultas

data class FakultasResponse(
    val code: Int,
    val status: String,
    val `data`: List<Fakultas>
)
