package com.opencode.flowerrates

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.opencode.flowerrates.data.Repository
import com.opencode.flowerrates.data.Repository.RatesWithPrediction
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.isActive
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import java.util.Calendar
import java.util.TimeZone

data class MainUiState(
    val rates: RatesWithPrediction = RatesWithPrediction(
        todayRate = null,
        yesterdayRate = null,
        todayPrediction = null,
        tomorrowPrediction = null,
        weeklyRates = emptyList(),
        error = null
    ),
    val isLoadingRates: Boolean = true,
    val lastRatesUpdate: String = ""
)

class MainViewModel : ViewModel() {

    private val _uiState = MutableStateFlow(MainUiState())
    val uiState: StateFlow<MainUiState> = _uiState.asStateFlow()

    private var syncJob: Job? = null

    init {
        refreshAll()
        scheduleDailySync()
    }

    fun loadRates() {
        viewModelScope.launch(Dispatchers.IO) {
            _uiState.value = _uiState.value.copy(isLoadingRates = true)
            try {
                val result = Repository.getRatesWithPrediction()
                _uiState.value = _uiState.value.copy(
                    rates = result,
                    isLoadingRates = false,
                    lastRatesUpdate = java.text.SimpleDateFormat(
                        "hh:mm a", java.util.Locale.ENGLISH
                    ).format(java.util.Date())
                )
            } catch (e: Exception) {
                _uiState.value = _uiState.value.copy(
                    rates = RatesWithPrediction(
                        todayRate = null, yesterdayRate = null,
                        todayPrediction = null, tomorrowPrediction = null,
                        weeklyRates = emptyList(),
                        error = e.message
                    ),
                    isLoadingRates = false
                )
            }
        }
    }

    fun refreshAll() {
        loadRates()
    }

    private fun scheduleDailySync() {
        syncJob?.cancel()
        val ist = TimeZone.getTimeZone("Asia/Kolkata")
        syncJob = viewModelScope.launch {
            while (isActive) {
                val now = System.currentTimeMillis()
                val cal = Calendar.getInstance(ist)
                cal.set(Calendar.HOUR_OF_DAY, 12)
                cal.set(Calendar.MINUTE, 30)
                cal.set(Calendar.SECOND, 0)
                cal.set(Calendar.MILLISECOND, 0)
                if (cal.timeInMillis <= now) {
                    cal.add(Calendar.DAY_OF_YEAR, 1)
                }
                delay(cal.timeInMillis - now)
                refreshAll()
            }
        }
    }

    override fun onCleared() {
        super.onCleared()
        syncJob?.cancel()
    }
}
