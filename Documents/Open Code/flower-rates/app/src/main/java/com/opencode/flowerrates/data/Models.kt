package com.opencode.flowerrates.data

data class RateRequestPayload(
    val page: Int = 1,
    val limit: Int = 7,
    val app_type: String = "CLIENT"
)

data class EncryptedRequest(
    val payload: String
)

data class ApiResponse(
    val status: String? = null,
    val message: String? = null,
    val data: List<RateData>? = null
)

data class RateData(
    val fp_id: String? = null,
    val fp_date: String? = null,
    val fp_price: String? = null,
    val fp_jaaji_price: String? = null,
    val created_at: String? = null,
    val updated_at: String? = null
)

data class RateDisplay(
    val date: String,
    val malligePrice: String,
    val jaajiPrice: String?
)

data class PredictionResult(
    val predictedPrice: Double,
    val trend: TrendDirection,
    val changePercent: Double
)

enum class TrendDirection {
    UP, DOWN, STABLE
}

data class NewsItem(
    val title: String,
    val description: String,
    val source: String,
    val imageUrl: String?,
    val link: String,
    val publishedAt: String
)
