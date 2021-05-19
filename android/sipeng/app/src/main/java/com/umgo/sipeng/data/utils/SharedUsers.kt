package com.umgo.sipeng.data.utils

import android.content.Context
import android.preference.PreferenceManager

class SharedUsers(val context: Context) {
    companion object {
        private const val ID_MAHASISWA = "ID_MAHASISWA"
        private const val NAMA = "NAMA"
        private const val NIM = "NIM"
        private const val KELAMIN = "KELAMIN"
        private const val ALAMAT = "ALAMAT"
        private const val FAKULTAS = "FAKULTAS"
        private const val ID_FAKULTAS = "ID_FAKULTAS"
        private const val PRODI = "PRODI"
        private const val ID_PRODI = "ID_PRODI"
        private const val LOGIN = "LOGIN"
        private const val ROLE = "ROLE"
    }

    private val data = PreferenceManager.getDefaultSharedPreferences(context)

    var id_mahasiswa = data.getString(ID_MAHASISWA, "")
        set(value) = data.edit().putString(ID_MAHASISWA, value).apply()

    var nama = data.getString(NAMA, "")
        set(value) = data.edit().putString(NAMA, value).apply()

    var nim = data.getString(NIM, "")
        set(value) = data.edit().putString(NIM, value).apply()

    var kelamin = data.getString(KELAMIN, "")
        set(value) = data.edit().putString(KELAMIN, value).apply()

    var alamat = data.getString(ALAMAT, "")
        set(value) = data.edit().putString(ALAMAT, value).apply()

    var fakultas = data.getString(FAKULTAS, "")
        set(value) = data.edit().putString(FAKULTAS, value).apply()

    var id_fakultas = data.getString(ID_FAKULTAS, "")
        set(value) = data.edit().putString(ID_FAKULTAS, value).apply()

    var prodi = data.getString(PRODI, "")
        set(value) = data.edit().putString(PRODI, value).apply()

    var id_prodi = data.getString(ID_PRODI, "")
        set(value) = data.edit().putString(ID_PRODI, value).apply()

    var isLogin = data.getBoolean(LOGIN, false)
        set(value) = data.edit().putBoolean(LOGIN, value).apply()

    var role = data.getString(ROLE, "")
        set(value) = data.edit().putString(ROLE, value).apply()

}