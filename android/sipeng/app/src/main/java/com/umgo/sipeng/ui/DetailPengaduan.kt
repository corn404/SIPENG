package com.umgo.sipeng.ui

import android.annotation.SuppressLint
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.MenuItem
import android.view.View
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.TextView
import coil.load
import com.umgo.sipeng.R
import com.umgo.sipeng.data.services.API.Companion.URL_SOCKETS

class DetailPengaduan : AppCompatActivity() {
    private lateinit var foto_pengaduan: ImageView
    private lateinit var text_fakultas: TextView
    private lateinit var text_kategori: TextView
    private lateinit var text_deskripsi: TextView
    private lateinit var text_balasan: TextView
    private lateinit var card_balasan: LinearLayout
    var data:Bundle? = null
    @SuppressLint("SetTextI18n")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_detail_pengaduan)
        supportActionBar?.setDisplayHomeAsUpEnabled(true)
        supportActionBar?.setHomeButtonEnabled(true)
        supportActionBar?.title = "Detail Pengaduan"
        data = intent.extras

        foto_pengaduan = findViewById(R.id.foto_pengaduan)
        text_fakultas  = findViewById(R.id.text_fakultas)
        text_kategori = findViewById(R.id.text_kategori)
        text_deskripsi = findViewById(R.id.text_deskripsi)
        text_balasan = findViewById(R.id.text_balasan)
        card_balasan = findViewById(R.id.card_balasan)

        text_fakultas.text = "Fakultas : ${data?.getString("FAKULTAS")}"
        text_kategori.text = "Kategori : ${data?.getString("KATEGORI")}"
        text_deskripsi.text = data?.getString("KETERANGAN")
        text_balasan.text = data?.getString("BALASAN")

        if(data?.getString("BALASAN") == "") {
            card_balasan.visibility = View.GONE
        } else {
            card_balasan.visibility = View.VISIBLE
        }

        foto_pengaduan.load("${URL_SOCKETS}/uploads/pengaduan/${data?.getString("FOTO")}")
    }


    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        super.onOptionsItemSelected(item)
        when(item.itemId) {
            android.R.id.home -> {
                onBackPressed()
            }
        }
        return true
    }

    override fun onBackPressed() {
        super.onBackPressed()
        finish()
    }

}