package com.opencode.flowerrates.data

import com.google.gson.Gson
import com.opencode.flowerrates.crypto.CryptoJSCompat
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.toRequestBody
import java.util.concurrent.TimeUnit

object ApiService {

    private const val BASE_URL = "https://tackyant.com/mallige-api"

    private val client = OkHttpClient.Builder()
        .connectTimeout(30, TimeUnit.SECONDS)
        .readTimeout(30, TimeUnit.SECONDS)
        .writeTimeout(30, TimeUnit.SECONDS)
        .build()

    private val gson = Gson()
    private val jsonMediaType = "application/json".toMediaType()

    fun fetchRates(limit: Int = 7): List<RateData> {
        val payload = RateRequestPayload(page = 1, limit = limit, app_type = "CLIENT")
        val jsonPayload = gson.toJson(payload)
        val encrypted = CryptoJSCompat.encrypt(jsonPayload)
        val requestBody = EncryptedRequest(payload = encrypted)
        val body = gson.toJson(requestBody).toRequestBody(jsonMediaType)

        val request = Request.Builder()
            .url("$BASE_URL/flowerprices")
            .post(body)
            .addHeader("Content-Type", "application/json")
            .build()

        val response = client.newCall(request).execute()
        val responseBody = response.body?.string()

        if (!response.isSuccessful || responseBody == null) {
            throw Exception("API error: ${response.code}")
        }

        val apiResponse = gson.fromJson(responseBody, ApiResponse::class.java)

        if (apiResponse.status == "Invalid") {
            throw Exception(apiResponse.message ?: "API returned invalid status")
        }

        return apiResponse.data ?: emptyList()
    }
}
