package com.umgo.sipeng.ui.fragments.home

import android.app.Activity
import android.app.Dialog
import android.content.Intent
import android.graphics.drawable.InsetDrawable
import android.net.Uri
import android.os.Bundle
import android.os.Handler
import android.provider.OpenableColumns
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.EditText
import android.widget.ImageView
import android.widget.Toast
import androidx.core.net.toFile
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import androidx.navigation.fragment.findNavController
import com.google.android.material.card.MaterialCardView
import com.umgo.sipeng.MainActivity
import com.umgo.sipeng.R
import com.umgo.sipeng.data.utils.SharedUsers
import com.umgo.sipeng.data.utils.UploadRequestBody
import com.umgo.sipeng.data.viewmodel.PengaduanViewModel
import com.umgo.sipeng.databinding.FragmentHomeBinding
import com.umgo.sipeng.ui.listfakultas.ListFakultas
import com.umgo.sipeng.ui.listkategori.ListKategori
import okhttp3.MediaType
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.MultipartBody
import okhttp3.RequestBody
import java.io.File
import java.io.FileInputStream
import java.io.FileOutputStream
import java.net.URI.create


class Home : Fragment(), UploadRequestBody.UploadCallback {
    private var _binding: FragmentHomeBinding? = null
    private val binding get() = _binding

    private lateinit var modalPengaduan: Dialog

    private var FAKULTAS_REQUEST = 11
    private var KAREGORI_REQUEST = 12
    private var PICKIMAGE_REQUEST = 13

    private var ID_KATEGORI = ""
    private var NAMA_KATEGORI = ""
    private var ID_FAKULTAS = ""
    private var NAMA_FAKULTAS = ""
    private var imgUri: Uri? = null

    private lateinit var et_kategori: EditText
    private lateinit var et_fakultas: EditText
    private lateinit var photo_pengaduan: ImageView

    private lateinit var pengaduanViewModel: PengaduanViewModel
    private lateinit var sharedUsers: SharedUsers
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        _binding = FragmentHomeBinding.inflate(inflater, container, false)
        sharedUsers = SharedUsers(requireContext())
        pengaduanViewModel =
            ViewModelProvider(requireActivity()).get(PengaduanViewModel::class.java)
        binding?.btnPengaduan?.setOnClickListener {
            modalPengaduan = Dialog(requireContext())
            modalPengaduan.setContentView(R.layout.modal_pengaduan)
            modalPengaduan.window?.setBackgroundDrawable(
                InsetDrawable(
                    activity?.getDrawable(R.drawable.background_modal),
                    30
                )
            )
            modalPengaduan.window?.setLayout(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.WRAP_CONTENT
            )
            modalPengaduan.setCancelable(false)
            modalPengaduan.show()

            modalPengaduan.findViewById<MaterialCardView>(R.id.btn_keluar).setOnClickListener {
                modalPengaduan.dismiss()
            }

            et_kategori = modalPengaduan.findViewById(R.id.et_kategori)
            et_fakultas = modalPengaduan.findViewById(R.id.et_fakultas)
            val et_deskripsi = modalPengaduan.findViewById<EditText>(R.id.et_deskripsi)
            val btn_upload = modalPengaduan.findViewById<MaterialCardView>(R.id.btn_upload)
            val btn_kirim = modalPengaduan.findViewById<MaterialCardView>(R.id.btn_kirim)
            photo_pengaduan = modalPengaduan.findViewById(R.id.photo_pengaduan)

            et_kategori.setOnClickListener {
                startActivityForResult(
                    Intent(requireContext(), ListKategori::class.java),
                    KAREGORI_REQUEST
                )
            }
//            et_kategori.setOnFocusChangeListener { v, hasFocus ->
//                if (hasFocus) {
//                    startActivityForResult(
//                        Intent(requireContext(), ListKategori::class.java),
//                        KAREGORI_REQUEST
//                    )
//                }
//            }

            et_fakultas.setOnClickListener {
                startActivityForResult(
                    Intent(requireContext(), ListFakultas::class.java),
                    FAKULTAS_REQUEST
                )
            }

            et_fakultas.setOnFocusChangeListener { v, hasFocus ->
                if (hasFocus) {
                    startActivityForResult(
                        Intent(requireContext(), ListFakultas::class.java),
                        FAKULTAS_REQUEST
                    )
                }
            }

            btn_upload.setOnClickListener {
                Intent(Intent.ACTION_PICK).also {
                    it.type = "image/*"
                    val mimeTypes = arrayOf("image/jpeg", "image/png")
                    it.putExtra(Intent.EXTRA_MIME_TYPES, mimeTypes)
                    startActivityForResult(it, PICKIMAGE_REQUEST)
                }
//                val gallery = Intent(Intent.ACTION_PICK, MediaStore.Images.Media.INTERNAL_CONTENT_URI)
//                startActivityForResult(gallery, PICKIMAGE_REQUEST)
            }


            btn_kirim.setOnClickListener {
                if (imgUri == null) {
                    Toast.makeText(requireContext(), "Belum ada Photo aduan", Toast.LENGTH_SHORT)
                        .show()
                    return@setOnClickListener
                }

                val cursor = context?.contentResolver?.query(imgUri!!, null, null, null, null)
                val nameIndex = cursor?.getColumnIndex(OpenableColumns.DISPLAY_NAME)

                cursor?.moveToFirst()
                val filename = nameIndex?.let { it1 -> cursor.getString(it1) }
//                val file = File((context as MainActivity).cacheDir, filename)
//                val file = File(imgUri!!.path)

                val parcelFileDescriptor = context?.contentResolver?.openFileDescriptor(imgUri!!, "r", null) ?: return@setOnClickListener

                val inputStream = FileInputStream(parcelFileDescriptor.fileDescriptor)
                val file = File((context as MainActivity).cacheDir, filename)
                val outputStream = FileOutputStream(file)
                inputStream.copyTo(outputStream)


                val requestFile = RequestBody.create(
                    context?.contentResolver?.getType(imgUri!!).toString().toMediaTypeOrNull(),
                    file
                )



                pengaduanViewModel.kirimPengaduan(
                    ID_KATEGORI.toInt(), ID_FAKULTAS.toInt(), sharedUsers.id_mahasiswa!!.toInt(), et_deskripsi.text.toString(),
                    MultipartBody.Part.createFormData("foto", filename, requestFile)
                )
                pengaduanViewModel.listenMessage().observe(viewLifecycleOwner, Observer {
                    if (it.isNotEmpty()) {
                        Toast.makeText(requireContext(), it, Toast.LENGTH_SHORT).show()
                        if(it == "Success") {
                            modalPengaduan.dismiss()
                        }
                    }

                    Handler().postDelayed({ pengaduanViewModel.clearMessage() }, 200)
                })
            }
        }


        binding?.btnDaftarPengaduan?.setOnClickListener {
            findNavController().navigate(R.id.action_home_to_pengaduan)
        }

        binding?.btnPanduan?.setOnClickListener {
            findNavController().navigate(R.id.action_home_to_panduan)
        }

        binding?.btnTentang?.setOnClickListener {
            findNavController().navigate(R.id.action_home_to_tentang)
        }


        return binding?.root
    }


    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (requestCode == KAREGORI_REQUEST) {
            if (resultCode == Activity.RESULT_OK) {
                ID_KATEGORI = data?.getStringExtra("ID_KATEGORI").toString()
                NAMA_KATEGORI = data?.getStringExtra("NAMA_KATEGORI").toString()
                et_kategori.setText(NAMA_KATEGORI)
            }

            if (resultCode == Activity.RESULT_CANCELED) {
                ID_KATEGORI = ""
                NAMA_KATEGORI = ""
                et_kategori.setText("")
            }
        }

        if (requestCode == FAKULTAS_REQUEST) {
            if (resultCode == Activity.RESULT_OK) {
                ID_FAKULTAS = data?.getStringExtra("ID_FAKULTAS").toString()
                NAMA_FAKULTAS = data?.getStringExtra("NAMA_FAKULTAS").toString()
                et_fakultas.setText(NAMA_FAKULTAS)
            }

            if (resultCode == Activity.RESULT_CANCELED) {
                ID_FAKULTAS = ""
                NAMA_FAKULTAS = ""
                et_fakultas.setText("")
            }
        }

        if (requestCode == PICKIMAGE_REQUEST) {
            if (resultCode == Activity.RESULT_OK) {
                imgUri = data?.data!!
                photo_pengaduan.setImageURI(imgUri)
            }
        }
    }


    override fun onDestroy() {
        _binding = null
        super.onDestroy()
    }

    override fun onProgressUpdate(percentage: Int) {}


}