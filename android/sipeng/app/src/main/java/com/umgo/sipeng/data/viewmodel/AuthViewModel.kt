package com.umgo.sipeng.data.viewmodel

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.umgo.sipeng.data.models.users.LoginRequest
import com.umgo.sipeng.data.models.users.LoginResponse
import com.umgo.sipeng.data.services.API
import kotlinx.coroutines.launch
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class AuthViewModel: ViewModel() {

    private var token = MutableLiveData<String>()
    private var message = MutableLiveData<String>()

    init {
        token.postValue("")
        message.postValue("")
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


    fun listenToken() = token
    fun listenMessage() = message
    fun clearMessage() {
        message.postValue("")
    }




}