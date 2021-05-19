package com.umgo.sipeng.ui.listkategori

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.umgo.sipeng.R
import com.umgo.sipeng.data.adapter.KategoriAdapter
import com.umgo.sipeng.data.viewmodel.PengaduanViewModel

class ListKategori : AppCompatActivity() {
    private lateinit var rv_kategori: RecyclerView
    private lateinit var pengaduanViewModel: PengaduanViewModel
    private lateinit var kategoriAdapter: KategoriAdapter
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_list_kategori)
        pengaduanViewModel = ViewModelProvider(this).get(PengaduanViewModel::class.java)
        kategoriAdapter = KategoriAdapter(mutableListOf(), this, pengaduanViewModel)
        rv_kategori = findViewById(R.id.rv_kategori)

        rv_kategori.apply {
            layoutManager = LinearLayoutManager(this@ListKategori)
            adapter = kategoriAdapter
        }

        pengaduanViewModel.getKategori()
        pengaduanViewModel.listenKategori().observe(this, Observer {
            rv_kategori.adapter.let { a ->
                if(a is KategoriAdapter) {
                    a.updateList(it)
                }
            }
        })

    }
}