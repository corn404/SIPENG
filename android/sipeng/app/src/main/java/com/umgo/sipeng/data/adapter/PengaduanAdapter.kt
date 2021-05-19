package com.umgo.sipeng.data.adapter

import android.annotation.SuppressLint
import android.content.Context
import android.content.Intent
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.google.android.material.card.MaterialCardView
import com.umgo.sipeng.MainActivity
import com.umgo.sipeng.R
import com.umgo.sipeng.data.models.pengaduan.Pengaduan
import com.umgo.sipeng.data.viewmodel.PengaduanViewModel
import com.umgo.sipeng.ui.DetailPengaduan

class PengaduanAdapter(
    private var pengaduan: MutableList<Pengaduan>,
    private var context: Context,
    private var pengaduanViewModel: PengaduanViewModel
): RecyclerView.Adapter<PengaduanAdapter.ViewHolder>() {

    class ViewHolder(item: View): RecyclerView.ViewHolder(item) {
        val btn_pengaduan = item.findViewById<MaterialCardView>(R.id.btn_pengaduan)
        val text_judul_pengaduan = item.findViewById<TextView>(R.id.text_judul_pengaduan)
        val text_nama_kategori = item.findViewById<TextView>(R.id.text_nama_kategori)
        val text_nama_fakultas = item.findViewById<TextView>(R.id.text_nama_fakultas)
        @SuppressLint("SetTextI18n")
        fun bind(data: Pengaduan, context: Context, pengaduanViewModel: PengaduanViewModel) {
            text_judul_pengaduan.text = data.keterangan
            text_nama_kategori.text = "Kategori: ${data.kategori}"
            text_nama_fakultas.text = "Fakultas : ${data.nama_fakultas}"

            btn_pengaduan.setOnClickListener {
                val i = Intent((context as MainActivity), DetailPengaduan::class.java)
                i.putExtra("KETERANGAN", data.keterangan)
                i.putExtra("KATEGORI", data.kategori)
                i.putExtra("FAKULTAS", data.nama_fakultas)
                i.putExtra("BALASAN", data.balasan)
                i.putExtra("FOTO", data.foto)
                context.startActivity(i)
            }
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        return ViewHolder(LayoutInflater.from(parent.context).inflate(R.layout.pengaduan_items, parent, false))
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) = holder.bind(pengaduan[position], context, pengaduanViewModel)

    override fun getItemCount() = pengaduan.size

    fun updateList(data: List<Pengaduan>) {
        pengaduan.clear()
        pengaduan.addAll(data)
        notifyDataSetChanged()
    }
}