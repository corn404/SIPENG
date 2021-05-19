package com.umgo.sipeng.ui.fragments.akun

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.umgo.sipeng.R
import com.umgo.sipeng.databinding.FragmentAkunBinding

class Akun : Fragment() {
   private var _binding: FragmentAkunBinding? = null
   private val binding get() = _binding

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentAkunBinding.inflate(inflater, container, false)
        return binding?.root
    }


}