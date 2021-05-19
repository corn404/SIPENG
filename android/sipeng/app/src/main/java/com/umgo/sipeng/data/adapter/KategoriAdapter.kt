package com.umgo.sipeng.data.adapter

import android.app.Activity
import android.content.Context
import android.content.Intent
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.google.android.material.card.MaterialCardView
import com.umgo.sipeng.R
import com.umgo.sipeng.data.models.kategori.Kategori
import com.umgo.sipeng.data.viewmodel.PengaduanViewModel
import com.umgo.sipeng.ui.listkategori.ListKategori

class KategoriAdapter(
    private var kategori: MutableList<Kategori>,
    private var context: Context,
    private var pengaduanViewModel: PengaduanViewModel
): RecyclerView.Adapter<KategoriAdapter.ViewHolder>() {



    class ViewHolder(item: View): RecyclerView.ViewHolder(item) {
        val btn_kategori = item.findViewById<MaterialCardView>(R.id.btn_kategori)
        val text_nama_kategori = item.findViewById<TextView>(R.id.text_nama_kategori)
        fun bind(data: Kategori, context: Context, pengaduanViewModel: PengaduanViewModel) {
            text_nama_kategori.text = data.kategori
            btn_kategori.setOnClickListener {
                val returnIntent = Intent()
                returnIntent.putExtra("ID_KATEGORI", data.id.toString())
                returnIntent.putExtra("NAMA_KATEGORI", data.kategori)
                (context as ListKategori).setResult(Activity.RESULT_OK, returnIntent)
                context.finish()
            }
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        return ViewHolder(LayoutInflater.from(parent.context).inflate(R.layout.kategori_items, parent, false))
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) = holder.bind(kategori[position], context, pengaduanViewModel)

    override fun getItemCount() = kategori.size

    fun updateList(data: List<Kategori>) {
        kategori.clear()
        kategori.addAll(data)
        notifyDataSetChanged()
    }

}