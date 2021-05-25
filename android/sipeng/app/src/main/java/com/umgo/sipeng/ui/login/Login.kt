package com.umgo.sipeng.ui.login

import android.app.Dialog
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.Handler
import android.view.ViewGroup
import android.widget.EditText
import android.widget.Toast
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import com.auth0.android.jwt.JWT
import com.google.android.material.card.MaterialCardView
import com.umgo.sipeng.MainActivity
import com.umgo.sipeng.R
import com.umgo.sipeng.data.models.users.LoginRequest
import com.umgo.sipeng.data.utils.SharedUsers
import com.umgo.sipeng.data.viewmodel.AuthViewModel

class Login : AppCompatActivity() {
    private lateinit var loading: Dialog
    private lateinit var authViewModel: AuthViewModel
    private lateinit var jwt: JWT
    private lateinit var sharedUsers: SharedUsers
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)
        actionBar?.hide()
        supportActionBar?.hide()

        val btn_login = findViewById<MaterialCardView>(R.id.btn_login)
        val et_nim = findViewById<EditText>(R.id.et_nim)
        val et_password = findViewById<EditText>(R.id.et_password)
        authViewModel = ViewModelProvider(this).get(AuthViewModel::class.java)
        sharedUsers = SharedUsers(this)


        loading = Dialog(this@Login)
        loading.setContentView(R.layout.loading)
        loading.window?.setBackgroundDrawable(getDrawable(R.drawable.background_modal))
        loading.window?.setLayout(
            ViewGroup.LayoutParams.WRAP_CONTENT,
            ViewGroup.LayoutParams.WRAP_CONTENT
        )
        loading.setCancelable(false)

        btn_login.setOnClickListener {
            loading.show()
            if (et_nim.text.trim().isEmpty() || et_password.text.trim().isEmpty()) {
                Toast.makeText(this, "NIM atau password anda masih kosong", Toast.LENGTH_SHORT)
                    .show()
                loading.dismiss()
            } else {
                val req = LoginRequest(
                    username = et_nim.text.trim().toString(),
                    password = et_password.text.trim().toString()
                )
                authViewModel.login(req)
                authViewModel.listenToken().observe(this, Observer {
                    if (!it.isNullOrEmpty()) {
                        jwt = JWT(it)
                        val id_mahasiswa = jwt.getClaim("id_pengguna").asString()
                        val nama = jwt.getClaim("nama_lengkap").asString()
                        val nim = jwt.getClaim("nim").asString()
                        val kelamin = jwt.getClaim("kelamin").asString()
                        val id_fakultas = jwt.getClaim("id_fakultas").asString()
                        val fakultas = jwt.getClaim("nama_fakultas").asString()
                        val id_prodi = jwt.getClaim("id_prodi").asString()
                        val prodi = jwt.getClaim("nama_prodi").asString()
                        val alamat = jwt.getClaim("alamat").asString()
                        val role = jwt.getClaim("role").asString()
                        val foto = jwt.getClaim("foto").asString()

                        login(
                            id_mahasiswa.toString(),
                            nama.toString(),
                            nim.toString(),
                            kelamin.toString(),
                            alamat.toString(),
                            id_fakultas = id_fakultas.toString(),
                            fakultas.toString(),
                            id_prodi = id_prodi.toString(),
                            prodi.toString(),
                            role.toString(),
                            foto.toString()
                        )

                    }
                })

                authViewModel.listenMessage().observe(this, Observer {
                    if (it.isNotEmpty()) {
                        loading.dismiss()
                        Toast.makeText(this, it, Toast.LENGTH_SHORT).show()
                        Handler().postDelayed({
                            authViewModel.clearMessage()
                        }, 2000)
                    }
                })
            }
        }

    }

    private fun login(
        id_mahasiswa: String,
        nama: String,
        nim: String,
        kelamin: String,
        alamat: String,
        id_fakultas: String,
        fakultas: String,
        id_prodi: String,
        prodi: String,
        role: String,
        foto: String
    ) {
        sharedUsers.let {
            it.id_mahasiswa = id_mahasiswa
            it.nama = nama
            it.nim = nim
            it.prodi = prodi
            it.fakultas = fakultas
            it.kelamin = kelamin
            it.role = role
            it.alamat = alamat
            it.isLogin = true
            it.foto_profile = foto
            it.id_prodi = id_prodi
            it.id_fakultas = id_fakultas
        }

        loading.dismiss()
        finish()
        startActivity(Intent(this@Login, MainActivity::class.java))
    }
}