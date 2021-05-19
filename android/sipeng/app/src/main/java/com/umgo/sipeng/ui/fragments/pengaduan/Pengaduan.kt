package com.umgo.sipeng.ui.fragments.pengaduan

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.umgo.sipeng.R
import com.umgo.sipeng.data.adapter.PengaduanAdapter
import com.umgo.sipeng.data.utils.SharedUsers
import com.umgo.sipeng.data.viewmodel.PengaduanViewModel
import com.umgo.sipeng.databinding.FragmentPengaduanBinding


class Pengaduan : Fragment() {
    private var _binding: FragmentPengaduanBinding? = null
    private val binding get() = _binding

    private lateinit var rv_pengaduan: RecyclerView
    private lateinit var sharedUsers: SharedUsers
    private lateinit var pengaduanAdapter: PengaduanAdapter
    private lateinit var pengaduanViewModel: PengaduanViewModel
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentPengaduanBinding.inflate(inflater, container, false)
        sharedUsers = SharedUsers(requireContext())
        pengaduanViewModel = ViewModelProvider(requireActivity()).get(PengaduanViewModel::class.java)
        pengaduanAdapter = PengaduanAdapter(mutableListOf(), requireContext(), pengaduanViewModel)
        rv_pengaduan = binding?.rvPengaduan!!

        rv_pengaduan.apply {
            layoutManager = LinearLayoutManager(requireContext())
            adapter = pengaduanAdapter
        }

        pengaduanViewModel.getPengaduan(sharedUsers.id_mahasiswa!!.toInt())
        pengaduanViewModel.listenPengaduan().observe(viewLifecycleOwner, Observer {
            rv_pengaduan.adapter.let { a ->
                if(a is PengaduanAdapter) {
                    a.updateList(it)
                }
            }
        })


        return binding?.root
    }


    override fun onDestroy() {
        _binding = null
        super.onDestroy()
    }


}