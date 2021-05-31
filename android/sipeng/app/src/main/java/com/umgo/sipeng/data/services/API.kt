package com.umgo.sipeng.data.services

import com.umgo.sipeng.data.models.fakultas.FakultasResponse
import com.umgo.sipeng.data.models.kategori.KategoriResponse
import com.umgo.sipeng.data.models.pengaduan.PengaduanListResponse
import com.umgo.sipeng.data.models.pengaduan.PengaduanResponse
import com.umgo.sipeng.data.models.users.LoginRequest
import com.umgo.sipeng.data.models.users.LoginResponse
import com.umgo.sipeng.data.models.users.ProfileResponse
import okhttp3.MultipartBody
import okhttp3.RequestBody
import retrofit2.Call
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.*


interface API {

    @POST("mahasiswa/login")
    fun login(@Body req: LoginRequest): Call<LoginResponse>

    @GET("kategori")
    fun getKategori(): Call<KategoriResponse>

    @GET("fakultas")
    fun getFakultas(): Call<FakultasResponse>

    @Multipart
    @POST("pengaduan")
    fun kirimPengaduan(
        @PartMap() map: HashMap<String, RequestBody>,
        @Part file: MultipartBody.Part,
    ): Call<PengaduanResponse>


    @GET("pengaduan/pengadu/{id_pengadu}")
    fun getPengaduan(@Path("id_pengadu") id_pengadu: String) : Call<PengaduanListResponse>

    @Multipart
    @PUT("mahasiswa")
    fun updateProfile(
        @PartMap() map: HashMap<String, RequestBody>,
        @Part file: MultipartBody.Part
    ): Call<ProfileResponse>


//    @Multipart
//    @POST("upload")
//    fun uploadFileWithPartMap(
//        @PartMap partMap: Map<String?, RequestBody?>?,
//        @Part file: MultipartBody.Part?
//    ): Call<ResponseBody?>?

    companion object {
        val BASE_URL = "http://192.168.43.217:5000/api/v1/"
        val URL_SOCKETS = "http://192.168.43.217:5000"
        operator fun invoke(): API {
            return Retrofit.Builder()
                .addConverterFactory(GsonConverterFactory.create())
                .baseUrl(BASE_URL)
                .build()
                .create(API::class.java)
        }
    }
}