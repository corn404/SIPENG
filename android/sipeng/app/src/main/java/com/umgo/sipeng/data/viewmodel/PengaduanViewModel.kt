package com.umgo.sipeng.data.viewmodel

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.umgo.sipeng.data.models.fakultas.Fakultas
import com.umgo.sipeng.data.models.fakultas.FakultasResponse
import com.umgo.sipeng.data.models.kategori.Kategori
import com.umgo.sipeng.data.models.kategori.KategoriResponse
import com.umgo.sipeng.data.models.pengaduan.Pengaduan
import com.umgo.sipeng.data.models.pengaduan.PengaduanListResponse
import com.umgo.sipeng.data.models.pengaduan.PengaduanResponse
import com.umgo.sipeng.data.services.API
import kotlinx.coroutines.launch
import okhttp3.MediaType
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.MultipartBody
import okhttp3.RequestBody
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response


class PengaduanViewModel : ViewModel() {
    private var kategori = MutableLiveData<List<Kategori>>()
    private var fakultas = MutableLiveData<List<Fakultas>>()
    private var message = MutableLiveData<String>()
    private var pengaduan = MutableLiveData<List<Pengaduan>>()

    init {
        kategori.postValue(mutableListOf())
        fakultas.postValue(mutableListOf())
        pengaduan.postValue(mutableListOf())
        message.postValue("")
    }


    fun getKategori() {
        viewModelScope.launch {
            API().getKategori().enqueue(object : Callback<KategoriResponse> {
                override fun onResponse(
                    call: Call<KategoriResponse>,
                    response: Response<KategoriResponse>
                ) {
                    if (response.isSuccessful) {
                        kategori.postValue(response.body()?.data)
                    }
                }

                override fun onFailure(call: Call<KategoriResponse>, t: Throwable) {
                    kategori.postValue(mutableListOf())
                }

            })
        }
    }

    fun getFakultas() {
        viewModelScope.launch {
            API().getFakultas().enqueue(object : Callback<FakultasResponse> {
                override fun onResponse(
                    call: Call<FakultasResponse>,
                    response: Response<FakultasResponse>
                ) {
                    if (response.isSuccessful) {
                        fakultas.postValue(response.body()?.data)
                    }
                }

                override fun onFailure(call: Call<FakultasResponse>, t: Throwable) {
                    fakultas.postValue(mutableListOf())
                }
            })
        }
    }

    fun kirimPengaduan(
        id_kategori: Int,
        id_fakultas: Int,
        id_pengadu: Int,
        keterangan: String,
        dataFoto: MultipartBody.Part
    ) {
        viewModelScope.launch {




            val kategori = createPartFromString(id_kategori.toString())
            val fakultas = createPartFromString(id_fakultas.toString())
            val pengadu = createPartFromString(id_pengadu.toString())
            val ket = createPartFromString(keterangan)

            val map: HashMap<String, RequestBody> = HashMap()
            map["id_kategori"] = kategori
            map["id_fakultas"] = fakultas
            map["id_pengadu"] = pengadu
            map["keterangan"] = ket


            println(map)


            API().kirimPengaduan(map, dataFoto).enqueue(object : Callback<PengaduanResponse> {
                override fun onResponse(
                    call: Call<PengaduanResponse>,
                    response: Response<PengaduanResponse>
                ) {
                    if (response.isSuccessful) {
                        message.postValue(response.body()?.data)
                    }
                }

                override fun onFailure(call: Call<PengaduanResponse>, t: Throwable) {
                    message.postValue(t.message)
                }

            })
        }
    }


    private fun createPartFromString(param: String): RequestBody {
        return RequestBody.create("multipart/form-data".toMediaTypeOrNull(), param)
    }



    fun getPengaduan(id_pengadu: Int) {
        viewModelScope.launch {
            API().getPengaduan(id_pengadu).enqueue(object : Callback<PengaduanListResponse> {
                override fun onResponse(
                    call: Call<PengaduanListResponse>,
                    response: Response<PengaduanListResponse>
                ) {
                    if(response.isSuccessful) {
                        pengaduan.postValue(response.body()?.data)
                    }
                }

                override fun onFailure(call: Call<PengaduanListResponse>, t: Throwable) {
                    pengaduan.postValue(mutableListOf())
                }

            })

        }
    }





    fun listenFakultas() = fakultas
    fun listenKategori() = kategori
    fun listenMessage() = message
    fun listenPengaduan() = pengaduan
    fun clearMessage() {
        message.postValue("")
    }


}