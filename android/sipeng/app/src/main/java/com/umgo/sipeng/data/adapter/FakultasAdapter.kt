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
import com.umgo.sipeng.data.models.fakultas.Fakultas
import com.umgo.sipeng.data.viewmodel.PengaduanViewModel
import com.umgo.sipeng.ui.listfakultas.ListFakultas

class FakultasAdapter(
    private var fakultas: MutableList<Fakultas>,
    private var context: Context,
    private var pengaduanViewModel: PengaduanViewModel
): RecyclerView.Adapter<FakultasAdapter.ViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        return ViewHolder(LayoutInflater.from(parent.context).inflate(R.layout.fakultas_items, parent, false))
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) = holder.bind(fakultas[position], context, pengaduanViewModel)

    override fun getItemCount() = fakultas.size

    fun updateList(data: List<Fakultas>) {
        fakultas.clear()
        fakultas.addAll(data)
        notifyDataSetChanged()
    }

    class ViewHolder(item: View): RecyclerView.ViewHolder(item) {
        val btn_fakultas = item.findViewById<MaterialCardView>(R.id.btn_fakultas)
        val text_nama_fakultas = item.findViewById<TextView>(R.id.text_nama_fakultas)
        fun bind(data: Fakultas, context: Context, pengaduanViewModel: PengaduanViewModel) {
            text_nama_fakultas.text = data.nama_fakultas
            btn_fakultas.setOnClickListener {
                val returnIntent = Intent()
                returnIntent.putExtra("ID_FAKULTAS", data.id.toString())
                returnIntent.putExtra("NAMA_FAKULTAS", data.nama_fakultas)
                (context as ListFakultas).setResult(Activity.RESULT_OK, returnIntent)
                context.finish()
            }
        }
    }
}