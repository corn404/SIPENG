package com.umgo.sipeng.ui.fragments.tentang

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.umgo.sipeng.R
import com.umgo.sipeng.databinding.FragmentTentangBinding


class Tentang : Fragment() {
   private var _binding: FragmentTentangBinding? = null
   private val binding get() = _binding

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentTentangBinding.inflate(inflater, container, false)
        return binding?.root
    }

    override fun onDestroy() {
        _binding = null
        super.onDestroy()
    }

}