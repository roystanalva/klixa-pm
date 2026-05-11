package com.opencode.flowerrates.data

import okhttp3.OkHttpClient
import okhttp3.Request
import org.xmlpull.v1.XmlPullParser
import org.xmlpull.v1.XmlPullParserFactory
import java.io.StringReader
import java.util.concurrent.TimeUnit

object NewsService {

    private val client = OkHttpClient.Builder()
        .connectTimeout(15, TimeUnit.SECONDS)
        .readTimeout(15, TimeUnit.SECONDS)
        .followRedirects(true)
        .build()

    private val newsFeeds = listOf(
        "https://www.thehindu.com/news/national/karnataka/feeder/default.rss",
        "https://www.thehindu.com/news/cities/Mangalore/feeder/default.rss",
        "https://timesofindia.indiatimes.com/rssfeeds/2964573.cms",
        "https://www.deccanherald.com/feed?taxonomy=32",
        "https://indianexpress.com/section/india/karnataka/feed/",
        "https://news.google.com/rss/search?q=Udupi&hl=en-IN&gl=IN&ceid=IN:en",
        "https://news.google.com/rss/search?q=Mangalore&hl=en-IN&gl=IN&ceid=IN:en",
        "https://news.google.com/rss/search?q=Mangaluru+Karnataka+India&hl=en-IN&gl=IN&ceid=IN:en",
        "https://news.google.com/rss/search?q=Karnataka+coastal+news&hl=en-IN&gl=IN&ceid=IN:en",
        "https://news.google.com/rss/search?q=Mallige+flower+Shankarapura&hl=en-IN&gl=IN&ceid=IN:en"
    )

    fun fetchNews(): List<NewsItem> {
        val allNews = mutableListOf<NewsItem>()

        for (feedUrl in newsFeeds) {
            try {
                val items = fetchAndParse(feedUrl)
                allNews.addAll(items)
            } catch (_: Exception) { }
        }

        return allNews
            .distinctBy { it.title }
            .sortedByDescending { it.publishedAt }
            .take(50)
    }

    private fun fetchAndParse(feedUrl: String): List<NewsItem> {
        val request = Request.Builder()
            .url(feedUrl)
            .header("User-Agent", "Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.6099.144 Mobile Safari/537.36")
            .build()

        val response = client.newCall(request).execute()
        val body = response.body ?: return emptyList()
        val xml = body.string()
        body.close()

        return parseRss(xml, feedUrl)
    }

    private fun parseRss(xml: String, feedUrl: String): List<NewsItem> {
        val items = mutableListOf<NewsItem>()

        val factory = XmlPullParserFactory.newInstance()
        factory.isNamespaceAware = false
        val parser = factory.newPullParser()
        parser.setInput(StringReader(xml))

        var title = ""
        var description = ""
        var link = ""
        var imageUrl: String? = null
        var pubDate = ""
        var inItem = false
        var sourceName = ""

        try {
            var eventType = parser.eventType
            while (eventType != XmlPullParser.END_DOCUMENT) {
                val rawTag = parser.name ?: ""
                val tagName = rawTag.lowercase()

                when (eventType) {
                    XmlPullParser.START_TAG -> {
                        when {
                            tagName in listOf("item", "entry") -> {
                                inItem = true
                                title = ""
                                description = ""
                                link = ""
                                imageUrl = null
                                pubDate = ""
                                sourceName = ""
                            }
                            tagName in listOf("media:content", "media:thumbnail", "media:thmbnail") -> {
                                if (imageUrl == null) {
                                    imageUrl = parser.getAttributeValue(null, "url")
                                }
                            }
                            tagName == "media:group" -> { }
                            tagName == "source" && inItem -> {
                                sourceName = parser.getAttributeValue(null, "url") ?: ""
                            }
                        }
                    }

                    XmlPullParser.TEXT -> {
                        if (inItem) {
                            val text = parser.text?.trim() ?: ""
                            when (tagName) {
                                "title" -> if (title.isEmpty()) title = text
                                "link" -> if (link.isEmpty()) link = text
                                "description" -> if (description.isEmpty()) description = text
                                "pubdate" -> if (pubDate.isEmpty()) pubDate = text
                                "published" -> if (pubDate.isEmpty()) pubDate = text
                                "updated" -> if (pubDate.isEmpty()) pubDate = text
                                "dc:date" -> if (pubDate.isEmpty()) pubDate = text
                                "source" -> if (sourceName.isEmpty()) sourceName = text
                            }
                        }
                    }

                    XmlPullParser.END_TAG -> {
                        if ((tagName == "item" || tagName == "entry") && title.isNotEmpty()) {
                            val cleanDesc = cleanHtml(description).take(300)

                            val finalLink = if (link.startsWith("https://news.google.com")) {
                                extractGoogleNewsUrl(link)
                            } else {
                                link
                            }

                            val finalSource = when {
                                sourceName.isNotEmpty() -> sourceName
                                feedUrl.contains("google") -> "Google News"
                                else -> extractSource(feedUrl)
                            }

                            items.add(
                                NewsItem(
                                    title = cleanHtml(title),
                                    description = cleanDesc,
                                    source = finalSource,
                                    imageUrl = imageUrl,
                                    link = finalLink,
                                    publishedAt = pubDate
                                )
                            )
                            inItem = false
                        }
                    }
                }

                eventType = parser.next()
            }
        } catch (_: Exception) { }

        return items
    }

    private fun cleanHtml(text: String): String {
        return text
            .replace(Regex("<[^>]*>"), "")
            .replace(Regex("\\s+"), " ")
            .replace("&amp;", "&")
            .replace("&lt;", "<")
            .replace("&gt;", ">")
            .replace("&quot;", "\"")
            .replace("&#39;", "'")
            .replace("&#160;", " ")
            .replace("&apos;", "'")
            .replace("&nbsp;", " ")
            .trim()
    }

    private fun extractGoogleNewsUrl(googleUrl: String): String {
        return try {
            val query = java.net.URI(googleUrl).query ?: return googleUrl
            val params = query.split("&").associate {
                val parts = it.split("=", limit = 2)
                parts[0] to (parts.getOrNull(1) ?: "")
            }
            val encodedUrl = params["url"] ?: return googleUrl
            java.net.URLDecoder.decode(encodedUrl, "UTF-8")
        } catch (_: Exception) {
            googleUrl
        }
    }

    private fun extractSource(url: String): String {
        return when {
            url.contains("thehindu") -> "The Hindu"
            url.contains("timesofindia") -> "Times of India"
            url.contains("deccanherald") -> "Deccan Herald"
            url.contains("indianexpress") -> "Indian Express"
            url.contains("google") -> "Google News"
            else -> "News"
        }
    }
}
