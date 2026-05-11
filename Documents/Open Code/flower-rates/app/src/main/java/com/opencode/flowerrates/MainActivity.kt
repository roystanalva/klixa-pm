package com.opencode.flowerrates

import android.content.Context
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.runtime.*
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.LifecycleEventObserver
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.lifecycle.compose.LocalLifecycleOwner
import androidx.lifecycle.viewmodel.compose.viewModel
import com.opencode.flowerrates.ui.screens.RatesScreen
import com.opencode.flowerrates.ui.theme.FlowerRatesTheme

class MainActivity : ComponentActivity() {

    companion object {
        var appContext: Context? = null
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        appContext = applicationContext
        enableEdgeToEdge()

        setContent {
            FlowerRatesTheme {
                MainApp()
            }
        }
    }
}

@Composable
fun MainApp() {
    val viewModel: MainViewModel = viewModel()
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()

    val lifecycleOwner = LocalLifecycleOwner.current
    DisposableEffect(lifecycleOwner) {
        val observer = LifecycleEventObserver { _, event ->
            if (event == Lifecycle.Event.ON_RESUME) {
                viewModel.refreshAll()
            }
        }
        lifecycleOwner.lifecycle.addObserver(observer)
        onDispose { lifecycleOwner.lifecycle.removeObserver(observer) }
    }

    RatesScreen(
        rates = uiState.rates,
        isLoading = uiState.isLoadingRates,
        lastUpdate = uiState.lastRatesUpdate,
        onRefresh = { viewModel.refreshAll() }
    )
}
