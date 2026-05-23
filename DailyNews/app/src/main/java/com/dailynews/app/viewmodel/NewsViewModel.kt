package com.dailynews.app.viewmodel

import android.content.Context
import android.content.pm.PackageManager
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.core.content.ContextCompat
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewModelScope
import com.dailynews.app.data.api.NewsRepository
import com.dailynews.app.data.model.RssItem
import com.google.android.gms.location.LocationServices
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import java.util.Locale

data class NewsState(
    val articles: List<RssItem> = emptyList(),
    val isLoading: Boolean = false,
    val error: String? = null
)

enum class NewsCategory(val displayName: String) {
    RELEVANT("Relevant"),
    LOCAL("Local"),
    INTERNATIONAL("International"),
    FINANCE("Finance"),
    TECHNOLOGY("Technology"),
    SPORTS("Sports"),
    HEALTH("Health")
}

class NewsViewModel(private val context: Context) : ViewModel() {
    private val prefs = context.getSharedPreferences("dailynews", Context.MODE_PRIVATE)
    private val _states = MutableStateFlow(NewsCategory.entries.associateWith { NewsState() })
    val states: StateFlow<Map<NewsCategory, NewsState>> = _states

    var countryCode by mutableStateOf(
        prefs.getString("country_code", "us") ?: "us"
    )
        private set
    var cityName by mutableStateOf<String?>(prefs.getString("city_name", null))
        private set
    var isDarkMode by mutableStateOf(prefs.getBoolean("dark_mode", false))
        private set

    var hasLocationPermission by mutableStateOf(
        ContextCompat.checkSelfPermission(context, android.Manifest.permission.ACCESS_FINE_LOCATION) ==
            PackageManager.PERMISSION_GRANTED
    )
        private set
    var locationDenied by mutableStateOf(prefs.getBoolean("location_denied", false))
        private set

    init {
        if (hasLocationPermission) {
            detectLocation()
        }
        loadAllCategories()
    }

    fun onLocationGranted() {
        hasLocationPermission = true
        locationDenied = false
        prefs.edit().putBoolean("location_denied", false).apply()
        detectLocation()
    }

    fun onLocationDenied() {
        locationDenied = true
        hasLocationPermission = false
        prefs.edit().putBoolean("location_denied", true).apply()
    }

    fun toggleDarkMode() {
        isDarkMode = !isDarkMode
        prefs.edit().putBoolean("dark_mode", isDarkMode).apply()
    }

    private fun detectLocation() {
        val fusedClient = LocationServices.getFusedLocationProviderClient(context)
        fusedClient.lastLocation.addOnSuccessListener { location ->
            if (location != null) {
                viewModelScope.launch(Dispatchers.IO) {
                    try {
                        val geocoder = android.location.Geocoder(context, Locale.getDefault())
                        val addresses = geocoder.getFromLocation(location.latitude, location.longitude, 1)
                        if (!addresses.isNullOrEmpty()) {
                            val addr = addresses[0]
                            val newCountry = addr.countryCode?.lowercase() ?: "us"
                            val newCity = addr.locality ?: addr.subAdminArea ?: addr.adminArea
                            withContext(Dispatchers.Main) {
                                countryCode = newCountry
                                cityName = newCity
                                prefs.edit()
                                    .putString("country_code", newCountry)
                                    .putString("city_name", newCity)
                                    .apply()
                                loadAllCategories()
                            }
                        }
                    } catch (_: Exception) { }
                }
            }
        }
    }

    private fun getRegion(country: String): String {
        return when (country) {
            "in", "pk", "bd", "lk", "np", "bt" -> "asia/south"
            "jp", "kr", "cn", "hk", "tw" -> "asia/east"
            "sg", "my", "th", "vn", "id", "ph" -> "asia/sea"
            "ae", "sa", "qa", "kw", "om", "bh" -> "middleeast"
            "za", "ng", "ke", "eg", "gh" -> "africa"
            "au", "nz" -> "oceania"
            "br", "ar", "cl", "co" -> "southamerica"
            "gb", "fr", "de", "it", "es" -> "europe"
            else -> "other"
        }
    }

    private fun loadAllCategories() {
        viewModelScope.launch {
            NewsCategory.entries.forEach { category ->
                loadCategory(category)
                kotlinx.coroutines.delay(300)
            }
        }
    }

    fun loadCategory(category: NewsCategory) {
        viewModelScope.launch {
            updateState(category, _states.value[category]!!.copy(isLoading = true, error = null))
            var articles = emptyList<RssItem>()
            try {
                articles = withContext(Dispatchers.IO) {
                    val result = when (category) {
                        NewsCategory.RELEVANT -> NewsRepository.getHeadlines(countryCode, "general")
                        NewsCategory.LOCAL -> {
                            if (cityName != null) NewsRepository.getLocalNews(cityName!!, countryCode)
                            else NewsRepository.getHeadlines(countryCode, "general")
                        }
                        NewsCategory.INTERNATIONAL -> NewsRepository.getHeadlines(countryCode, "world")
                        NewsCategory.FINANCE -> NewsRepository.getHeadlines(countryCode, "business")
                        NewsCategory.TECHNOLOGY -> NewsRepository.getHeadlines(countryCode, "technology")
                        NewsCategory.SPORTS -> NewsRepository.getHeadlines(countryCode, "sports")
                        NewsCategory.HEALTH -> NewsRepository.getHeadlines(countryCode, "health")
                    }
                    if (result.isEmpty()) {
                        NewsRepository.getHeadlines("gb", category.name.lowercase())
                            .ifEmpty { NewsRepository.getHeadlines("us", "general") }
                    } else result
                }
            } catch (e: Exception) {
                articles = withContext(Dispatchers.IO) {
                    NewsRepository.getHeadlines("gb", "general")
                }
            }
            updateState(category, _states.value[category]!!.copy(
                articles = articles, isLoading = false,
                error = if (articles.isEmpty()) "No news available" else null
            ))
        }
    }

    private fun updateState(category: NewsCategory, state: NewsState) {
        _states.value = _states.value.toMutableMap().apply { put(category, state) }
    }

    class Factory(private val context: Context) : ViewModelProvider.Factory {
        @Suppress("UNCHECKED_CAST")
        override fun <T : ViewModel> create(modelClass: Class<T>): T {
            return NewsViewModel(context) as T
        }
    }
}
