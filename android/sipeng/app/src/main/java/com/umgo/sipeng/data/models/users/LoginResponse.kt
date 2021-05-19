package com.umgo.sipeng.data.models.users

data class LoginResponse(
    val code: Int,
    val status: String,
    val `data`: String
)
