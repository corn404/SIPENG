package com.umgo.sipeng.data.viewmodel

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.umgo.sipeng.data.models.users.LoginRequest
import com.umgo.sipeng.data.models.users.LoginResponse
import com.umgo.sipeng.data.models.users.ProfileResponse
import com.umgo.sipeng.data.services.API
import kotlinx.coroutines.launch
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.MultipartBody
import okhttp3.RequestBody
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class AuthViewModel: ViewModel() {

    private var token = MutableLiveData<String>()
    private var message = MutableLiveData<String>()
    private var foto = MutableLiveData<String>()

    init {
        token.postValue("")
        message.postValue("")
        foto.postValue("")
    }


    fun login(req: LoginRequest) {
        viewModelScope.launch {
            API().login(req).enqueue(object : Callback<LoginResponse> {
                override fun onResponse(
                    call: Call<LoginResponse>,
                    response: Response<LoginResponse>
                ) {
                    if(response.isSuccessful) {
                        when(response.body()?.status) {
                            "Success" -> {
                                token.postValue(response.body()?.data)
                            }

                            "Error" -> {
                                token.postValue("")
                                message.postValue(response.body()?.data)
                            }
                        }

                    }
                }

                override fun onFailure(call: Call<LoginResponse>, t: Throwable) {
                    token.postValue("")
                    message.postValue(t.message)
                }

            })
        }
    }

    fun updateProfile(
        id: Int,
        nama: String,
        kelamin: String,
        password: String,
        dataFoto: MultipartBody.Part
    ) {
        viewModelScope.launch {
            val d1 = createPartFromString(id.toString())
            val d2 = createPartFromString(nama)
            val d3 = createPartFromString(kelamin)
            val d4 = createPartFromString(password)
            val map: HashMap<String, RequestBody> = HashMap()
            map["id"] = d1
            map["nama"] = d2
            map["kelamin"] = d3
            map["password"] = d4
            API().updateProfile(map, dataFoto).enqueue(object: Callback<ProfileResponse> {
                override fun onResponse(
                    call: Call<ProfileResponse>,
                    response: Response<ProfileResponse>
                ) {
                    if(response.isSuccessful) {
                        message.postValue("Update profile berhasil")
                        if(response.body()?.status == "Updates") {
                            foto.postValue(response.body()?.data)
                        }
                    }
                }

                override fun onFailure(call: Call<ProfileResponse>, t: Throwable) {
                   message.postValue("Gagal update profile")
                }

            })
        }
    }


    private fun createPartFromString(param: String): RequestBody {
        return RequestBody.create("multipart/form-data".toMediaTypeOrNull(), param)
    }

    fun listenToken() = token
    fun listenMessage() = message
    fun clearMessage() {
        message.postValue("")
    }

    fun listenFoto() = foto




}