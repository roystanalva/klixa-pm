package com.dailynews.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.lifecycle.ViewModelProvider
import com.dailynews.app.viewmodel.NewsViewModel

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        val viewModel = ViewModelProvider(
            this, NewsViewModel.Factory(applicationContext)
        )[NewsViewModel::class.java]

        setContent {
            DailyNewsApp(viewModel = viewModel)
        }
    }
}
