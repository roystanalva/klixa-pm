package com.dailynews.app.data.api

import com.dailynews.app.data.model.RssItem

object NewsRepository {
    private val api = NewsApiClient.apiService

    // Only verified-working RSS URLs via rss2json.com
    private val sources = mapOf(
        "global" to mapOf(
            "general" to listOf(
                "http://feeds.bbci.co.uk/news/rss.xml",
                "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml",
                "https://feeds.skynews.com/feeds/rss/home.xml",
                "https://feeds.npr.org/1001/rss.xml",
                "https://www.aljazeera.com/xml/rss/all.xml"
            ),
            "world" to listOf(
                "http://feeds.bbci.co.uk/news/world/rss.xml",
                "https://rss.nytimes.com/services/xml/rss/nyt/World.xml",
                "https://feeds.skynews.com/feeds/rss/world.xml"
            ),
            "business" to listOf(
                "http://feeds.bbci.co.uk/news/business/rss.xml",
                "https://feeds.npr.org/1015/rss.xml",
                "https://feeds.skynews.com/feeds/rss/business.xml"
            ),
            "technology" to listOf(
                "http://feeds.bbci.co.uk/news/technology/rss.xml",
                "https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml",
                "https://feeds.skynews.com/feeds/rss/technology.xml"
            ),
            "sports" to listOf(
                "http://feeds.bbci.co.uk/sport/rss.xml",
                "https://rss.nytimes.com/services/xml/rss/nyt/Sports.xml",
                "https://feeds.skynews.com/feeds/rss/sports.xml"
            ),
            "health" to listOf(
                "http://feeds.bbci.co.uk/news/health/rss.xml",
                "https://rss.nytimes.com/services/xml/rss/nyt/Health.xml"
            )
        ),
        "us" to mapOf(
            "general" to listOf(
                "https://feeds.npr.org/1001/rss.xml",
                "https://rss.nytimes.com/services/xml/rss/nyt/US.xml",
                "https://feeds.washingtonpost.com/rss/national",
                "http://feeds.bbci.co.uk/news/rss.xml"
            ),
            "business" to listOf("https://feeds.npr.org/1015/rss.xml"),
            "technology" to listOf("https://feeds.npr.org/1019/rss.xml")
        ),
        "gb" to mapOf(
            "general" to listOf(
                "http://feeds.bbci.co.uk/news/uk/rss.xml",
                "https://feeds.skynews.com/feeds/rss/uk.xml",
                "https://www.theguardian.com/uk/rss"
            ),
            "world" to listOf("https://www.theguardian.com/world/rss"),
            "business" to listOf("https://www.theguardian.com/uk/business/rss"),
            "sports" to listOf("https://www.theguardian.com/uk/sport/rss")
        ),
        "in" to mapOf(
            "general" to listOf(
                "https://timesofindia.indiatimes.com/rssfeeds/-2128936835.cms",
                "https://indianexpress.com/feed/",
                "http://feeds.bbci.co.uk/news/rss.xml"
            ),
            "world" to listOf(
                "https://timesofindia.indiatimes.com/rssfeeds/296589292.cms"
            ),
            "business" to listOf(
                "https://www.livemint.com/rss/news",
                "http://feeds.bbci.co.uk/news/business/rss.xml"
            ),
            "technology" to listOf(
                "http://feeds.bbci.co.uk/news/technology/rss.xml"
            ),
            "sports" to listOf(
                "https://www.espncricinfo.com/rss/content/story/feeds/0.xml",
                "https://timesofindia.indiatimes.com/rssfeeds/47191462.cms"
            ),
            "health" to listOf(
                "https://timesofindia.indiatimes.com/rssfeeds/39089999.cms",
                "http://feeds.bbci.co.uk/news/health/rss.xml"
            )
        ),
        "jp" to mapOf(
            "general" to listOf(
                "https://www3.nhk.or.jp/rss/news/cat0.xml",
                "https://www.japantimes.co.jp/feed/top",
                "http://feeds.bbci.co.uk/news/rss.xml"
            ),
            "business" to listOf("https://www.japantimes.co.jp/feed/business"),
            "technology" to listOf("https://www3.nhk.or.jp/rss/news/cat6.xml"),
            "sports" to listOf("https://www.japantimes.co.jp/feed/sports")
        ),
        "sg" to mapOf(
            "general" to listOf(
                "https://www.channelnewsasia.com/rssfeeds/8395986/cna/latest",
                "https://www.straitstimes.com/news/singapore/rss.xml",
                "http://feeds.bbci.co.uk/news/rss.xml"
            ),
            "business" to listOf("https://www.straitstimes.com/news/business/rss.xml")
        ),
        "cn" to mapOf(
            "general" to listOf(
                "https://www.scmp.com/rss/4/feed",
                "http://feeds.bbci.co.uk/news/rss.xml"
            ),
            "business" to listOf("https://www.scmp.com/rss/6/feed"),
            "technology" to listOf("https://www.scmp.com/rss/12/feed")
        ),
        "kr" to mapOf(
            "general" to listOf(
                "https://www.koreaherald.com/feed.php",
                "https://www.koreatimes.co.kr/www/rss/newsAll.xml",
                "http://feeds.bbci.co.uk/news/rss.xml"
            ),
            "business" to listOf("https://www.koreaherald.com/feed.php?category=business")
        ),
        "my" to mapOf(
            "general" to listOf(
                "https://www.thestar.com.my/rss/News/Nation",
                "https://www.malaymail.com/feed/rss",
                "http://feeds.bbci.co.uk/news/rss.xml"
            ),
            "business" to listOf("https://www.thestar.com.my/rss/News/Business")
        ),
        "th" to mapOf(
            "general" to listOf(
                "https://www.bangkokpost.com/rss/data/1111.xml",
                "https://feeds.nationthailand.com/home/rss.xml",
                "http://feeds.bbci.co.uk/news/rss.xml"
            ),
            "business" to listOf("https://www.bangkokpost.com/rss/data/1114.xml")
        ),
        "id" to mapOf(
            "general" to listOf(
                "https://www.thejakartapost.com/feed",
                "http://feeds.bbci.co.uk/news/rss.xml"
            )
        ),
        "ph" to mapOf(
            "general" to listOf(
                "https://www.rappler.com/feed/",
                "https://www.philstar.com/rss/headlines",
                "http://feeds.bbci.co.uk/news/rss.xml"
            ),
            "business" to listOf("https://www.rappler.com/business/feed/")
        ),
        "pk" to mapOf(
            "general" to listOf(
                "https://www.dawn.com/feed",
                "http://feeds.bbci.co.uk/news/rss.xml"
            ),
            "sports" to listOf("https://www.dawn.com/rss/25476.xml")
        ),
        "au" to mapOf(
            "general" to listOf(
                "https://www.abc.net.au/news/feed/51120/rss.xml",
                "https://www.smh.com.au/rss/feed.xml",
                "http://feeds.bbci.co.uk/news/rss.xml"
            ),
            "world" to listOf("https://www.abc.net.au/news/feed/51122/rss.xml"),
            "business" to listOf("https://www.abc.net.au/news/feed/51124/rss.xml"),
            "sports" to listOf("https://www.abc.net.au/news/feed/51126/rss.xml")
        ),
        "ae" to mapOf(
            "general" to listOf(
                "https://gulfnews.com/rss/feed",
                "http://feeds.bbci.co.uk/news/rss.xml"
            ),
            "business" to listOf("https://gulfnews.com/rss/business")
        ),
        "za" to mapOf(
            "general" to listOf(
                "https://www.news24.com/rss",
                "http://feeds.bbci.co.uk/news/rss.xml"
            )
        )
    )

    private val globalFeeds = sources["global"]!!
    private val globalGeneral = globalFeeds["general"]!!

    private fun getFeedsFor(country: String, category: String): List<String> {
        val countryFeeds = sources[country]
        val categoryFeeds = countryFeeds?.get(category) ?: globalFeeds[category]
        return categoryFeeds ?: globalGeneral
    }

    private suspend fun fetchRss(feedUrl: String): List<RssItem> {
        val response = api.getRssFeed(rssUrl = feedUrl)
        return if (response.status == "ok") response.items else emptyList()
    }

    private suspend fun fetchMerged(urls: List<String>, limit: Int = 25): List<RssItem> {
        val seen = mutableSetOf<String>()
        val results = mutableListOf<RssItem>()
        for (url in urls) {
            if (results.size >= limit) break
            try {
                for (item in fetchRss(url)) {
                    if (item.link !in seen && item.title.isNotBlank()) {
                        seen.add(item.link)
                        results.add(item)
                        if (results.size >= limit) break
                    }
                }
            } catch (_: Exception) { }
        }
        return results
    }

    suspend fun getHeadlines(country: String, category: String? = null): List<RssItem> {
        val cat = category ?: "general"
        val feeds = getFeedsFor(country, cat)
        return fetchMerged(feeds)
    }

    suspend fun getLocalNews(city: String, country: String): List<RssItem> {
        val query = "${city.replace(" ", "+")}+local+news"
        val googleNewsUrl = "https://news.google.com/rss/search?q=$query&hl=en-${country.uppercase()}&gl=${country.uppercase()}&ceid=${country.uppercase()}:en"
        return try {
            fetchRss(googleNewsUrl).take(25)
        } catch (_: Exception) {
            val countryFeeds = sources[country]
            val localUrls = countryFeeds?.get("general") ?: globalGeneral.take(2)
            val results = fetchMerged(localUrls.take(2), 15)
            if (results.isNotEmpty()) results
            else fetchMerged(globalGeneral.filter { !it.contains("bbc") }.take(2), 15)
        }
    }
}
