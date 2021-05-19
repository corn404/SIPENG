package com.umgo.sipeng.ui.listfakultas

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.umgo.sipeng.R
import com.umgo.sipeng.data.adapter.FakultasAdapter
import com.umgo.sipeng.data.viewmodel.PengaduanViewModel

class ListFakultas : AppCompatActivity() {
    private lateinit var rv_fakultas: RecyclerView
    private lateinit var pengaduanViewModel: PengaduanViewModel
    private lateinit var fakultasAdapter: FakultasAdapter
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_list_fakultas)
        pengaduanViewModel = ViewModelProvider(this).get(PengaduanViewModel::class.java)
        fakultasAdapter = FakultasAdapter(mutableListOf(), this, pengaduanViewModel)

        rv_fakultas = findViewById(R.id.rv_fakultas)
        rv_fakultas.apply {
            layoutManager = LinearLayoutManager(this@ListFakultas)
            adapter = fakultasAdapter
        }

        pengaduanViewModel.getFakultas()
        pengaduanViewModel.listenFakultas().observe(this, Observer {
            rv_fakultas.adapter.let { a ->
                if(a is FakultasAdapter) {
                    a.updateList(it)
                }
            }
        })

    }
}