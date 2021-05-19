package com.umgo.sipeng.ui.splashscreen

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.Handler
import com.umgo.sipeng.MainActivity
import com.umgo.sipeng.R
import com.umgo.sipeng.data.utils.SharedUsers
import com.umgo.sipeng.ui.login.Login

class SplashScreen : AppCompatActivity() {
    private lateinit var sharedUsers: SharedUsers
    private lateinit var i: Intent
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_splash_screen)
        actionBar?.hide()
        supportActionBar?.hide()
        sharedUsers = SharedUsers(this)


        if(sharedUsers.isLogin) {
            i = Intent(this@SplashScreen, MainActivity::class.java)
        } else {
            i = Intent(this@SplashScreen, Login::class.java)
        }


        Handler().postDelayed({
            finish()
            startActivity(i)
        }, 2000)
    }
}