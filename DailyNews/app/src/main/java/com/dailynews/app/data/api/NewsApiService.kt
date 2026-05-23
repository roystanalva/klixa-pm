package com.dailynews.app.data.api

import com.dailynews.app.data.model.RssResponse
import retrofit2.http.GET
import retrofit2.http.Query

interface NewsApiService {
    @GET("v1/api.json")
    suspend fun getRssFeed(
        @Query("rss_url") rssUrl: String
    ): RssResponse
}
