package com.umgo.sipeng

import android.annotation.SuppressLint
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.MenuItem
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.widget.Toolbar
import androidx.drawerlayout.widget.DrawerLayout
import androidx.navigation.NavController
import androidx.navigation.findNavController
import androidx.navigation.ui.AppBarConfiguration
import androidx.navigation.ui.navigateUp
import androidx.navigation.ui.setupActionBarWithNavController
import androidx.navigation.ui.setupWithNavController
import com.google.android.material.navigation.NavigationView
import com.umgo.sipeng.data.utils.SharedUsers
import com.umgo.sipeng.ui.login.Login

class MainActivity : AppCompatActivity() {
    private lateinit var navController: NavController
    private lateinit var appBarConfiguration: AppBarConfiguration
    private lateinit var sharedUsers: SharedUsers
    @SuppressLint("SetTextI18n")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        sharedUsers = SharedUsers(this)
        val toolbar: Toolbar = findViewById(R.id.toolbar)
        setSupportActionBar(toolbar)
        val drawerLayout: DrawerLayout = findViewById(R.id.drawer_layout)
        val navView: NavigationView = findViewById(R.id.navigationView)
        val header = navView.getHeaderView(0)
        navController = findNavController(R.id.fragment)
        appBarConfiguration = AppBarConfiguration(navController.graph, drawerLayout)


        header.findViewById<TextView>(R.id.text_nama).text = sharedUsers.nama
        header.findViewById<TextView>(R.id.text_nim).text = "NIM : ${sharedUsers.nim}"
        header.findViewById<TextView>(R.id.text_fakultas).text = "Fakultas : ${sharedUsers.fakultas}"

        navView.menu.findItem(R.id.nav_keluar).setOnMenuItemClickListener(object : MenuItem.OnMenuItemClickListener {
            override fun onMenuItemClick(item: MenuItem?): Boolean {
                logOut()
                return true
            }
        })

        setupActionBarWithNavController(navController, appBarConfiguration)
        navView.setupWithNavController(navController)

    }

    private fun logOut() {
        sharedUsers.let {
            it.fakultas = ""
            it.nim = ""
            it.alamat = ""
            it.isLogin = false
            it.id_fakultas = ""
            it.id_mahasiswa = ""
            it.id_prodi = ""
            it.kelamin = ""
            it.nama = ""
            it.prodi = ""
            it.role = ""
        }

        finish()
        startActivity(Intent(this, Login::class.java))
    }

    override fun onSupportNavigateUp(): Boolean {
        return navController.navigateUp(appBarConfiguration) || super.onSupportNavigateUp()
    }
}