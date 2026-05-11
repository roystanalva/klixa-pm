package com.opencode.flowerrates.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Refresh
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage
import com.opencode.flowerrates.data.NewsItem
import com.opencode.flowerrates.ui.theme.*
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

@Composable
fun NewsScreen(
    news: List<NewsItem>,
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
        item {
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
                            text = "Local News",
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

        item {
            Text(
                text = "      Stories",
                modifier = Modifier.padding(top = 12.dp, bottom = 4.dp),
                fontSize = 13.sp,
                fontWeight = FontWeight.SemiBold,
                color = TextSecondary
            )
        }

        item {
            StoriesRow(news)
        }

        item {
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                text = "      Latest Updates",
                modifier = Modifier.padding(vertical = 8.dp),
                fontSize = 15.sp,
                fontWeight = FontWeight.Bold,
                color = TextPrimary
            )
        }

        if (isLoading) {
            item {
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(300.dp),
                    contentAlignment = Alignment.Center
                ) {
                    CircularProgressIndicator(color = JasmineGreen)
                }
            }
        } else if (news.isEmpty()) {
            item { EmptyNewsCard(onRefresh) }
        } else {
            items(news) { item -> NewsFeedCard(item) }
        }
    }
}

@Composable
private fun StoriesRow(news: List<NewsItem>) {
    val stories = news.take(10)

    LazyRow(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 4.dp),
        contentPadding = PaddingValues(horizontal = 16.dp),
        horizontalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        items(stories) { story ->
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                modifier = Modifier.width(68.dp)
            ) {
                Box(
                    modifier = Modifier
                        .size(64.dp)
                        .clip(CircleShape)
                        .border(
                            width = 2.dp,
                            brush = Brush.sweepGradient(
                                colors = listOf(
                                    StoryBorderStart,
                                    StoryBorderMid,
                                    StoryBorderEnd,
                                    StoryBorderStart
                                )
                            ),
                            shape = CircleShape
                        )
                        .background(Color.LightGray),
                    contentAlignment = Alignment.Center
                ) {
                    if (story.imageUrl != null) {
                        AsyncImage(
                            model = story.imageUrl,
                            contentDescription = null,
                            modifier = Modifier
                                .size(56.dp)
                                .clip(CircleShape),
                            contentScale = ContentScale.Crop
                        )
                    } else {
                        Text(
                            text = story.source.take(2),
                            fontSize = 12.sp,
                            fontWeight = FontWeight.Bold,
                            color = Color.White
                        )
                    }
                }
                Spacer(modifier = Modifier.height(4.dp))
                Text(
                    text = story.source,
                    fontSize = 10.sp,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis,
                    color = TextSecondary
                )
            }
        }
    }
}

@Composable
private fun NewsFeedCard(item: NewsItem) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp, vertical = 4.dp)
            .clickable {
                openInBrowser(item.link)
            },
        shape = RoundedCornerShape(12.dp),
        elevation = CardDefaults.cardElevation(defaultElevation = 1.dp),
        colors = CardDefaults.cardColors(containerColor = CardBackground)
    ) {
        Column {
            if (item.imageUrl != null) {
                AsyncImage(
                    model = item.imageUrl,
                    contentDescription = null,
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(180.dp)
                        .clip(RoundedCornerShape(topStart = 12.dp, topEnd = 12.dp)),
                    contentScale = ContentScale.Crop
                )
            }

            Column(modifier = Modifier.padding(12.dp)) {
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    Surface(
                        shape = RoundedCornerShape(4.dp),
                        color = JasmineGreen.copy(alpha = 0.1f)
                    ) {
                        Text(
                            text = item.source,
                            modifier = Modifier.padding(horizontal = 8.dp, vertical = 2.dp),
                            fontSize = 11.sp,
                            fontWeight = FontWeight.Medium,
                            color = JasmineGreen
                        )
                    }
                    Text(
                        text = formatRelativeTime(item.publishedAt),
                        fontSize = 11.sp,
                        color = TextSecondary
                    )
                }

                Spacer(modifier = Modifier.height(6.dp))

                Text(
                    text = item.title,
                    fontSize = 15.sp,
                    fontWeight = FontWeight.SemiBold,
                    color = TextPrimary,
                    maxLines = 3,
                    overflow = TextOverflow.Ellipsis
                )

                if (item.description.isNotEmpty()) {
                    Spacer(modifier = Modifier.height(4.dp))
                    Text(
                        text = item.description,
                        fontSize = 13.sp,
                        color = TextSecondary,
                        maxLines = 2,
                        overflow = TextOverflow.Ellipsis
                    )
                }

                Spacer(modifier = Modifier.height(8.dp))

                Text(
                    text = "Read more",
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Medium,
                    color = JasmineGreen
                )
            }
        }
    }
}

@Composable
private fun EmptyNewsCard(onRefresh: () -> Unit) {
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
                text = "No News Available",
                fontSize = 18.sp,
                fontWeight = FontWeight.SemiBold,
                color = TextPrimary
            )
            Spacer(modifier = Modifier.height(8.dp))
            Button(
                onClick = onRefresh,
                colors = ButtonDefaults.buttonColors(containerColor = JasmineGreen)
            ) {
                Text("Refresh")
            }
        }
    }
}

private fun formatRelativeTime(dateStr: String): String {
    return try {
        val formats = listOf(
            SimpleDateFormat("EEE, dd MMM yyyy HH:mm:ss Z", Locale.ENGLISH),
            SimpleDateFormat("EEE, dd MMM yyyy HH:mm:ss zzz", Locale.ENGLISH),
            SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss", Locale.ENGLISH)
        )
        var date: Date? = null
        for (fmt in formats) {
            try {
                date = fmt.parse(dateStr)
                if (date != null) break
            } catch (_: Exception) { }
        }
        if (date == null) return ""
        val now = Date()
        val diff = now.time - date.time
        when {
            diff < 60_000 -> "Just now"
            diff < 3600_000 -> "${diff / 60_000}m ago"
            diff < 86400_000 -> "${diff / 3600_000}h ago"
            else -> "${diff / 86400_000}d ago"
        }
    } catch (_: Exception) { "" }
}

private fun openInBrowser(url: String) {
    try {
        val intent = android.content.Intent(android.content.Intent.ACTION_VIEW)
        intent.data = android.net.Uri.parse(url)
        intent.addFlags(android.content.Intent.FLAG_ACTIVITY_NEW_TASK)
        com.opencode.flowerrates.MainActivity.appContext?.startActivity(intent)
    } catch (_: Exception) { }
}
