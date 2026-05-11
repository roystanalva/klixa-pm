package com.opencode.flowerrates.data

import java.text.SimpleDateFormat
import java.util.Calendar
import java.util.Date
import java.util.Locale
import java.util.TimeZone

object Repository {

        data class RatesWithPrediction(
        val todayRate: RateDisplay?,
        val yesterdayRate: RateDisplay?,
        val todayPrediction: PredictionResult?,
        val tomorrowPrediction: PredictionResult?,
        val weeklyRates: List<RateDisplay>,
        val error: String?,
        val debugInfo: String? = null
    )

    fun getRatesWithPrediction(): RatesWithPrediction {
        val ist = TimeZone.getTimeZone("Asia/Kolkata")
        return try {
            val rates = ApiService.fetchRates(limit = 20)
            val displayList = rates.map { rate ->
                RateDisplay(
                    date = formatDate(rate.fp_date ?: ""),
                    malligePrice = rate.fp_price ?: "0",
                    jaajiPrice = rate.fp_jaaji_price
                )
            }

            val todayFmt = SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH).apply { timeZone = ist }
            val todayStr = todayFmt.format(Date())
            val cal = Calendar.getInstance(ist)
            cal.add(Calendar.DAY_OF_YEAR, -1)
            val yesterdayStr = todayFmt.format(cal.time)

            val debug = "rates=${rates.size} first='${rates.firstOrNull()?.fp_date}' norm='${normalizeDate(rates.firstOrNull()?.fp_date ?: "")}' todayStr=$todayStr"

            val todayIdx = rates.indexOfFirst { normalizeDate(it.fp_date ?: "") == todayStr }
            val yesterdayIdx = rates.indexOfFirst { normalizeDate(it.fp_date ?: "") == yesterdayStr }

            var todayRate = if (todayIdx >= 0) displayList.getOrNull(todayIdx) else null
            var yesterdayRate = if (yesterdayIdx >= 0) displayList.getOrNull(yesterdayIdx) else null

            // Position-based fallback: if date matching found nothing, use first entry
            if (todayRate == null && rates.isNotEmpty()) {
                todayRate = displayList.firstOrNull()
                yesterdayRate = displayList.getOrNull(1)
            }

            val dateRateMap = mutableMapOf<String, RateDisplay>()
            rates.forEachIndexed { i, rate ->
                val norm = normalizeDate(rate.fp_date ?: "")
                if (norm != null) dateRateMap[norm] = displayList[i]
            }

            val dateFmt = SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH).apply { timeZone = ist }
            val displayFmt = SimpleDateFormat("dd MMM yyyy", Locale.ENGLISH).apply { timeZone = ist }
            val weeklyBuilder = mutableListOf<RateDisplay>()

            if (dateRateMap.isNotEmpty()) {
                cal.time = Date()
                cal.add(Calendar.DAY_OF_YEAR, -1)
                for (i in 0 until 10) {
                    val ds = dateFmt.format(cal.time)
                    val rate = dateRateMap[ds]
                    if (rate != null) {
                        weeklyBuilder.add(rate)
                    } else {
                        weeklyBuilder.add(RateDisplay(
                            date = displayFmt.format(cal.time),
                            malligePrice = "\u2014",
                            jaajiPrice = null
                        ))
                    }
                    cal.add(Calendar.DAY_OF_YEAR, -1)
                }
            } else {
                // Position-based fallback
                for (i in 0 until minOf(10, displayList.size)) {
                    weeklyBuilder.add(displayList[i])
                }
                while (weeklyBuilder.size < 10) {
                    weeklyBuilder.add(RateDisplay("\u2014", "\u2014", null))
                }
            }

            val prices = weeklyBuilder.mapNotNull { it.malligePrice.toDoubleOrNull() }

            val todayPrediction: PredictionResult?
            val tomorrowPrediction: PredictionResult?

            if (todayRate == null) {
                val nextPred = computePrediction(prices)
                todayPrediction = nextPred
                tomorrowPrediction = if (nextPred != null && prices.size >= 2) {
                    val avgChange = if (prices.size >= 3) {
                        (prices zip prices.drop(1)).map { (a, b) -> a - b }.average()
                    } else {
                        prices[0] - prices[1]
                    }
                    val nextPrice = kotlin.math.max(0.0, nextPred.predictedPrice + avgChange)
                    val nextChange = nextPrice - nextPred.predictedPrice
                    val nextPercent = if (nextPred.predictedPrice != 0.0)
                        kotlin.math.abs((nextChange / nextPred.predictedPrice) * 100) else 0.0
                    val nextTrend = when {
                        nextChange > 0 -> TrendDirection.UP
                        nextChange < 0 -> TrendDirection.DOWN
                        else -> TrendDirection.STABLE
                    }
                    PredictionResult(predictedPrice = nextPrice, trend = nextTrend, changePercent = nextPercent)
                } else null
            } else {
                todayPrediction = null
                val todayPrice = todayRate.malligePrice.toDoubleOrNull()
                val allPrices = if (todayPrice != null) listOf(todayPrice) + prices else prices
                tomorrowPrediction = computePrediction(allPrices, referencePrice = todayPrice)
            }

            RatesWithPrediction(
                todayRate = todayRate,
                yesterdayRate = yesterdayRate,
                todayPrediction = todayPrediction,
                tomorrowPrediction = tomorrowPrediction,
                weeklyRates = weeklyBuilder,
                error = null,
                debugInfo = debug
            )
        } catch (e: Exception) {
            RatesWithPrediction(
                todayRate = null,
                yesterdayRate = null,
                todayPrediction = null,
                tomorrowPrediction = null,
                weeklyRates = emptyList(),
                error = e.message ?: "Failed to fetch rates"
            )
        }
    }

    private fun normalizeDate(dateStr: String): String? {
        return toDateStr(dateStr, "yyyy-MM-dd")
    }

    private fun formatDate(dateStr: String): String {
        return toDateStr(dateStr, "dd MMM yyyy") ?: dateStr
    }

    private fun toDateStr(dateStr: String, outPattern: String): String? {
        val s = dateStr.trim()
        if (s.isEmpty()) return null

        val ist = TimeZone.getTimeZone("Asia/Kolkata")
        val outFmt = SimpleDateFormat(outPattern, Locale.ENGLISH).apply { timeZone = ist }
        val basePatterns = listOf(
            "yyyy-MM-dd'T'HH:mm:ss.SSS", "yyyy-MM-dd'T'HH:mm:ss",
            "yyyy-MM-dd HH:mm:ss.SSS", "yyyy-MM-dd HH:mm:ss"
        )

        // 1) Detect and handle timezone offset at end
        var dtPart: String? = null
        var tz: TimeZone? = null

        if (s.endsWith("Z")) {
            dtPart = s.dropLast(1)
            tz = TimeZone.getTimeZone("GMT+00:00")
        } else if (s.length >= 6) {
            val last6 = s.substring(s.length - 6)
            if ((last6[0] == '+' || last6[0] == '-') && last6[3] == ':') {
                dtPart = s.dropLast(6)
                tz = TimeZone.getTimeZone("GMT$last6")
            }
        }
        if (dtPart == null && s.length >= 5) {
            val last5 = s.substring(s.length - 5)
            if (last5[0] == '+' || last5[0] == '-') {
                val sign = if (last5[0] == '+') "+" else "-"
                dtPart = s.dropLast(5)
                tz = TimeZone.getTimeZone("GMT$sign${last5.substring(1, 3)}:${last5.substring(3, 5)}")
            }
        }

        if (dtPart != null && tz != null) {
            for (pat in basePatterns) {
                try {
                    val parser = SimpleDateFormat(pat, Locale.ENGLISH).apply { timeZone = tz }
                    val date = parser.parse(dtPart) ?: continue
                    return outFmt.format(date)
                } catch (_: Exception) { }
            }
        }

        // 2) Direct yyyy-MM-dd extraction from anywhere in the string
        for (i in 0..s.length - 10) {
            val chunk = s.substring(i, i + 10)
            if (chunk[4] == '-' && chunk[7] == '-') {
                val p = chunk.split("-")
                val y = p[0].toIntOrNull()
                val m = p[1].toIntOrNull()
                val d = p[2].toIntOrNull()
                if (y != null && m != null && d != null && m in 1..12 && d in 1..31) {
                    if (outPattern == "yyyy-MM-dd") return chunk
                    val sdf = SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH)
                    try { return outFmt.format(sdf.parse(chunk) ?: continue) } catch (_: Exception) { }
                }
            }
        }

        // 3) Parse without timezone (assume IST)
        for (pat in basePatterns) {
            try { return outFmt.format(SimpleDateFormat(pat, Locale.ENGLISH).apply { timeZone = ist }.parse(s) ?: continue) } catch (_: Exception) { }
        }

        // 4) Non-ISO formats
        val other = listOf("dd/MM/yyyy", "MM/dd/yyyy", "dd-MM-yyyy",
            "dd MMM yyyy", "dd MMM, yyyy", "MMM dd, yyyy",
            "dd.MM.yyyy", "yyyy/MM/dd", "yyyyMMdd")
        for (pat in other) {
            try { return outFmt.format(SimpleDateFormat(pat, Locale.ENGLISH).apply { timeZone = ist }.parse(s) ?: continue) } catch (_: Exception) { }
        }
        return null
    }

    private fun computePrediction(prices: List<Double>, referencePrice: Double? = null): PredictionResult? {
        if (prices.size < 2) return null

        val ref = referencePrice ?: prices.first()
        val latest = prices.first()
        val change = latest - prices[1]

        val predictedPrice = if (prices.size >= 3) {
            val changes = (prices zip prices.drop(1)).map { (a, b) -> a - b }
            val alpha = 0.55
            val weights = changes.indices.map { i -> Math.pow(1.0 - alpha, i.toDouble()) }
            val weightedAvg = changes.zip(weights).map { (c, w) -> c * w }.sum() / weights.sum()
            latest + weightedAvg
        } else {
            latest + change
        }

        val clampedPrice = kotlin.math.max(0.0, predictedPrice)
        val trend = when {
            clampedPrice > ref -> TrendDirection.UP
            clampedPrice < ref -> TrendDirection.DOWN
            else -> TrendDirection.STABLE
        }
        val changePercent = if (ref != 0.0)
            kotlin.math.abs(((clampedPrice - ref) / ref) * 100) else 0.0

        return PredictionResult(
            predictedPrice = clampedPrice,
            trend = trend,
            changePercent = changePercent
        )
    }

}
