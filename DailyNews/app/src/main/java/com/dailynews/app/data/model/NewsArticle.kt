package com.dailynews.app.data.model

import com.google.gson.annotations.SerializedName

data class RssResponse(
    val status: String,
    val feed: RssFeedMeta,
    val items: List<RssItem>
)

data class RssFeedMeta(
    val title: String,
    val description: String,
    val link: String,
    val image: String?
)

data class RssItem(
    val title: String,
    val pubDate: String,
    val link: String,
    val guid: String,
    val author: String?,
    val thumbnail: String?,
    val description: String?,
    val content: String?,
    val enclosure: Any?,
    val categories: List<String>?
)
