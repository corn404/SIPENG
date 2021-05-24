package com.umgo.sipeng.ui.fragments.akun

import android.app.Activity
import android.app.Dialog
import android.content.Intent
import android.graphics.drawable.InsetDrawable
import android.net.Uri
import android.os.Bundle
import android.os.Handler
import android.provider.OpenableColumns
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.RadioGroup
import android.widget.Toast
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import androidx.navigation.fragment.findNavController
import coil.load
import coil.transform.RoundedCornersTransformation
import com.umgo.sipeng.MainActivity
import com.umgo.sipeng.R
import com.umgo.sipeng.data.services.API.Companion.URL_SOCKETS
import com.umgo.sipeng.data.utils.SharedUsers
import com.umgo.sipeng.data.utils.UploadRequestBody
import com.umgo.sipeng.data.viewmodel.AuthViewModel
import com.umgo.sipeng.databinding.FragmentAkunBinding
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.MultipartBody
import okhttp3.RequestBody
import java.io.File
import java.io.FileInputStream
import java.io.FileOutputStream

class Akun : Fragment(), UploadRequestBody.UploadCallback {
    private var _binding: FragmentAkunBinding? = null
    private val binding get() = _binding
    private lateinit var sharedUsers: SharedUsers
    private lateinit var authViewModel: AuthViewModel
    private lateinit var loading: Dialog

    private var PICKIMAGE_REQUEST = 13
    private var kelamin = ""
    private var id_mahasiswa = ""
    private var imgUri: Uri? = null
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentAkunBinding.inflate(inflater, container, false)
        sharedUsers = SharedUsers(requireContext())
        authViewModel = ViewModelProvider(requireActivity()).get(AuthViewModel::class.java)

        loading = Dialog(requireContext())
        loading.setContentView(R.layout.loading)
        loading.window?.setBackgroundDrawable(
            InsetDrawable(
                activity?.getDrawable(R.drawable.background_modal),
                30
            )
        )
        loading.window?.setLayout(
            ViewGroup.LayoutParams.WRAP_CONTENT,
            ViewGroup.LayoutParams.WRAP_CONTENT
        )
        loading.setCancelable(false)




        sharedUsers.let {
            binding?.etNim?.setText(it.nim)
            binding?.etNama?.setText(it.nama)
            kelamin = it.kelamin.toString()
            id_mahasiswa = it.id_mahasiswa.toString()

            if (!it.foto_profile.isNullOrEmpty()) {
                binding?.uploadFoto?.load("${URL_SOCKETS}/uploads/profile/${it.foto_profile}") {
                    transformations(RoundedCornersTransformation(100F))
                }
            } else {
                binding?.uploadFoto?.load("${URL_SOCKETS}/uploads/profile/20210524_100317_1.png") {
                    transformations(RoundedCornersTransformation(100F))
                }
            }
        }

        binding?.radioKelamin?.setOnCheckedChangeListener(object :
            RadioGroup.OnCheckedChangeListener {
            override fun onCheckedChanged(group: RadioGroup?, checkedId: Int) {
                when (checkedId) {
                    R.id.pria -> kelamin = "L"
                    R.id.wanita -> kelamin = "P"
                    else -> kelamin = ""
                }
            }

        })

        binding?.radioKelamin?.check(if (sharedUsers.kelamin == "L") R.id.pria else R.id.wanita)


        binding?.btnUpload?.setOnClickListener {
            Intent(Intent.ACTION_PICK).also {
                it.type = "image/*"
                val mimeTypes = arrayOf("image/jpeg", "image/png")
                it.putExtra(Intent.EXTRA_MIME_TYPES, mimeTypes)
                startActivityForResult(it, PICKIMAGE_REQUEST)
            }
        }

        binding?.btnUpdate?.setOnClickListener {
            loading.show()
            if (kelamin.isEmpty()) {
                Toast.makeText(requireContext(), "Kelamin belum dipilih", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }
            val nama = binding?.etNama?.text
            val password = binding?.etPassword?.text
            if (imgUri != null) {
                val cursor = context?.contentResolver?.query(imgUri!!, null, null, null, null)
                val nameIndex = cursor?.getColumnIndex(OpenableColumns.DISPLAY_NAME)
                cursor?.moveToFirst()
                val filename = nameIndex?.let { it1 -> cursor.getString(it1) }
                val parcelFileDescriptor =
                    context?.contentResolver?.openFileDescriptor(imgUri!!, "r", null)
                        ?: return@setOnClickListener

                val inputStream = FileInputStream(parcelFileDescriptor.fileDescriptor)
                val file = File((context as MainActivity).cacheDir, filename)
                val outputStream = FileOutputStream(file)
                inputStream.copyTo(outputStream)

                val requestFile = RequestBody.create(
                    context?.contentResolver?.getType(imgUri!!).toString().toMediaTypeOrNull(),
                    file
                )

                authViewModel.updateProfile(
                    id_mahasiswa.toInt(),
                    nama.toString(),
                    kelamin,
                    password.toString(),
                    MultipartBody.Part.createFormData("foto", filename, requestFile)
                )
            } else {
                authViewModel.updateProfile(
                    id_mahasiswa.toInt(),
                    nama.toString(),
                    kelamin,
                    password.toString(),
                    MultipartBody.Part.createFormData("foto", "")
                )
            }


            authViewModel.listenMessage().observe(viewLifecycleOwner, Observer {
                if(it.isNotEmpty()) {
                    loading.dismiss()
                    Toast.makeText(requireContext(), it, Toast.LENGTH_SHORT).show()
                }

                Handler().postDelayed({
                    authViewModel.clearMessage()
                }, 2000)

            })

            authViewModel.listenFoto().observe(viewLifecycleOwner, Observer { a ->
                if(a.isNotEmpty()) {
                    sharedUsers.let {
                        it.foto_profile = a
                    }
                }
            })

        }


        return binding?.root
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (requestCode == PICKIMAGE_REQUEST) {
            if (resultCode == Activity.RESULT_OK) {
                imgUri = data?.data!!
                binding?.uploadFoto?.load(imgUri) {
                    transformations(RoundedCornersTransformation(50F))
                }
            }
        }
    }

    override fun onProgressUpdate(percentage: Int) {}


}