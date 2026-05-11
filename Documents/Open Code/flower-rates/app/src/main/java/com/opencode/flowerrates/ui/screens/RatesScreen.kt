package com.opencode.flowerrates.ui.screens

import androidx.compose.animation.animateColorAsState
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowDropDown
import androidx.compose.material.icons.filled.ArrowDropUp
import androidx.compose.material.icons.filled.TrendingFlat
import androidx.compose.material.icons.filled.Refresh
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.opencode.flowerrates.data.PredictionResult
import com.opencode.flowerrates.data.RateDisplay
import com.opencode.flowerrates.data.Repository
import com.opencode.flowerrates.data.TrendDirection
import com.opencode.flowerrates.ui.theme.*

@Composable
fun RatesScreen(
    rates: Repository.RatesWithPrediction,
    isLoading: Boolean,
    lastUpdate: String,
    onRefresh: () -> Unit
) {
    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(BackgroundLight),
        contentPadding = PaddingValues(bottom = 16.dp)
    ) {
        item { TopBar(lastUpdate, onRefresh) }

        if (isLoading) {
            item {
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(400.dp),
                    contentAlignment = Alignment.Center
                ) {
                    CircularProgressIndicator(color = JasmineGreen)
                }
            }
        } else if (rates.error != null) {
            item { ErrorCard(rates.error, onRefresh) }
        } else {
            item { PriceHeaderCard(rates) }
            if (rates.todayRate == null && rates.todayPrediction != null) {
                item { PredictionCard(title = "Today's Prediction", prediction = rates.todayPrediction) }
            }
            if (rates.tomorrowPrediction != null) {
                item { PredictionCard(title = "Tomorrow's Prediction", prediction = rates.tomorrowPrediction) }
            }
            item { WeeklyRatesCard(rates.weeklyRates, rates.debugInfo) }
        }
    }
}

@Composable
private fun TopBar(lastUpdate: String, onRefresh: () -> Unit) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .background(
                Brush.verticalGradient(
                    colors = listOf(JasmineGreen, JasmineDarkGreen)
                )
            )
            .padding(horizontal = 16.dp, vertical = 12.dp)
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column {
                Text(
                    text = "Mallige Rates",
                    color = Color.White,
                    fontSize = 20.sp,
                    fontWeight = FontWeight.Bold
                )
                if (lastUpdate.isNotEmpty()) {
                    Text(
                        text = "Updated $lastUpdate",
                        color = Color.White.copy(alpha = 0.7f),
                        fontSize = 12.sp
                    )
                }
            }
            IconButton(onClick = onRefresh) {
                Icon(
                    Icons.Default.Refresh,
                    contentDescription = "Refresh",
                    tint = Color.White
                )
            }
        }
    }
}

@Composable
private fun PriceHeaderCard(rates: Repository.RatesWithPrediction) {
    val today = rates.todayRate
    val yesterday = rates.yesterdayRate

    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp),
        shape = RoundedCornerShape(20.dp),
        elevation = CardDefaults.cardElevation(defaultElevation = 4.dp),
        colors = CardDefaults.cardColors(containerColor = CardBackground)
    ) {
        Column(
            modifier = Modifier.padding(20.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(
                text = today?.date ?: "Today",
                fontSize = 14.sp,
                color = TextSecondary
            )

            Spacer(modifier = Modifier.height(8.dp))

            if (today != null) {
                Text(
                    text = "\u20B9${today.malligePrice}",
                    fontSize = 48.sp,
                    fontWeight = FontWeight.Bold,
                    color = JasmineGreen,
                    textAlign = TextAlign.Center
                )

                Text(
                    text = "Mallige (per Atte)",
                    fontSize = 13.sp,
                    color = TextSecondary
                )

                if (today.jaajiPrice != null && today.jaajiPrice != "0") {
                    Spacer(modifier = Modifier.height(4.dp))
                    Text(
                        text = "Jaaji: \u20B9${today.jaajiPrice}",
                        fontSize = 14.sp,
                        color = TextSecondary
                    )
                }

                if (yesterday != null) {
                    val todayPrice = today.malligePrice.toDoubleOrNull() ?: 0.0
                    val yesterdayPrice = yesterday.malligePrice.toDoubleOrNull() ?: 0.0
                    val diff = todayPrice - yesterdayPrice
                    val isUp = diff > 0
                    val isDown = diff < 0

                    Spacer(modifier = Modifier.height(12.dp))
                    HorizontalDivider(color = Color(0xFFEEEEEE), thickness = 0.5.dp)
                    Spacer(modifier = Modifier.height(12.dp))
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.Center
                    ) {
                        Text(
                            text = "Yesterday: \u20B9${yesterday.malligePrice}",
                            fontSize = 14.sp,
                            color = TextSecondary
                        )
                        Spacer(modifier = Modifier.width(8.dp))
                        if (diff != 0.0) {
                            Icon(
                                imageVector = if (isUp) Icons.Default.ArrowDropUp else Icons.Default.ArrowDropDown,
                                contentDescription = null,
                                tint = if (isUp) RateUpGreen else RateDownRed,
                                modifier = Modifier.size(20.dp)
                            )
                            Text(
                                text = "${if (isUp) "+" else ""}\u20B9${String.format("%.0f", diff)}",
                                fontSize = 14.sp,
                                fontWeight = FontWeight.SemiBold,
                                color = if (isUp) RateUpGreen else RateDownRed
                            )
                        }
                    }
                }
            } else {
                Text(
                    text = "\u2014",
                    fontSize = 48.sp,
                    fontWeight = FontWeight.Bold,
                    color = TextSecondary,
                    textAlign = TextAlign.Center
                )
                Text(
                    text = "Not yet updated",
                    fontSize = 13.sp,
                    color = TextSecondary
                )
                Text(
                    text = "Updates at 12 PM daily",
                    fontSize = 11.sp,
                    color = TextSecondary.copy(alpha = 0.6f)
                )

                if (yesterday != null) {
                    Spacer(modifier = Modifier.height(12.dp))
                    HorizontalDivider(color = Color(0xFFEEEEEE), thickness = 0.5.dp)
                    Spacer(modifier = Modifier.height(12.dp))
                    Text(
                        text = "Yesterday: \u20B9${yesterday.malligePrice}",
                        fontSize = 14.sp,
                        color = TextSecondary
                    )
                    if (yesterday.jaajiPrice != null && yesterday.jaajiPrice != "0") {
                        Text(
                            text = "Jaaji: \u20B9${yesterday.jaajiPrice}",
                            fontSize = 13.sp,
                            color = TextSecondary.copy(alpha = 0.7f)
                        )
                    }
                }
            }
        }
    }
}

@Composable
private fun PredictionCard(title: String, prediction: PredictionResult?) {
    if (prediction == null) return

    val trendColor by animateColorAsState(
        targetValue = when (prediction.trend) {
            TrendDirection.UP -> RateUpGreen
            TrendDirection.DOWN -> RateDownRed
            TrendDirection.STABLE -> RateStableGray
        },
        label = "trendColor"
    )

    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp, vertical = 4.dp),
        shape = RoundedCornerShape(16.dp),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
        colors = CardDefaults.cardColors(containerColor = CardBackground)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = title,
                    fontSize = 13.sp,
                    color = TextSecondary
                )
                Text(
                    text = "\u20B9${String.format("%.0f", prediction.predictedPrice)}",
                    fontSize = 28.sp,
                    fontWeight = FontWeight.Bold,
                    color = trendColor
                )
            }
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                Icon(
                    imageVector = when (prediction.trend) {
                        TrendDirection.UP -> Icons.Default.ArrowDropUp
                        TrendDirection.DOWN -> Icons.Default.ArrowDropDown
                        TrendDirection.STABLE -> Icons.Default.TrendingFlat
                    },
                    contentDescription = null,
                    tint = trendColor,
                    modifier = Modifier.size(32.dp)
                )
                Text(
                    text = "${String.format("%.1f", prediction.changePercent)}%",
                    fontSize = 14.sp,
                    fontWeight = FontWeight.SemiBold,
                    color = trendColor
                )
                Text(
                    text = when (prediction.trend) {
                        TrendDirection.UP -> "Expected Increase"
                        TrendDirection.DOWN -> "Expected Decrease"
                        TrendDirection.STABLE -> "Stable"
                    },
                    fontSize = 11.sp,
                    color = trendColor
                )
            }
        }
    }
}

@Composable
private fun WeeklyRatesCard(weeklyRates: List<RateDisplay>, debugInfo: String? = null) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp),
        shape = RoundedCornerShape(16.dp),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
        colors = CardDefaults.cardColors(containerColor = CardBackground)
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(
                text = "Last 10 Days",
                fontSize = 16.sp,
                fontWeight = FontWeight.SemiBold,
                color = TextPrimary
            )
            Spacer(modifier = Modifier.height(12.dp))

            weeklyRates.forEachIndexed { index, rate ->
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 6.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = rate.date,
                        fontSize = 13.sp,
                        color = TextSecondary,
                        modifier = Modifier.weight(1f)
                    )
                    Text(
                        text = "\u20B9${rate.malligePrice}",
                        fontSize = 15.sp,
                        fontWeight = FontWeight.SemiBold,
                        color = TextPrimary
                    )
                    if (rate.jaajiPrice != null && rate.jaajiPrice != "0") {
                        Text(
                            text = "\u20B9${rate.jaajiPrice}",
                            fontSize = 13.sp,
                            color = TextSecondary,
                            modifier = Modifier.width(80.dp),
                            textAlign = TextAlign.End
                        )
                    }
                }
                if (index < weeklyRates.size - 1) {
                    HorizontalDivider(
                        color = Color(0xFFEEEEEE),
                        thickness = 0.5.dp
                    )
                }
            }

            if (debugInfo != null) {
                Spacer(modifier = Modifier.height(8.dp))
                Text(
                    text = debugInfo,
                    fontSize = 9.sp,
                    color = TextSecondary.copy(alpha = 0.4f),
                    textAlign = TextAlign.Center,
                    modifier = Modifier.fillMaxWidth()
                )
            }
        }
    }
}

@Composable
private fun ErrorCard(error: String?, onRefresh: () -> Unit) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp),
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = CardBackground)
    ) {
        Column(
            modifier = Modifier.padding(24.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(
                text = "Unable to load rates",
                fontSize = 18.sp,
                fontWeight = FontWeight.SemiBold,
                color = TextPrimary
            )
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                text = error ?: "Unknown error",
                fontSize = 13.sp,
                color = TextSecondary,
                textAlign = TextAlign.Center
            )
            Spacer(modifier = Modifier.height(16.dp))
            Button(
                onClick = onRefresh,
                colors = ButtonDefaults.buttonColors(containerColor = JasmineGreen)
            ) {
                Text("Retry")
            }
        }
    }
}
