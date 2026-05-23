# DailyNews

Android news aggregator with GPS-based local news, 7 sections, and dark theme.

## Features

- **7 News Sections:** Relevant, Local, International, Finance, Technology, Sports, Health
- **GPS Location Detection:** Auto-selects news sources by country (India, US, UK, Japan, Singapore, and 15+ countries)
- **Local News:** City-specific news via Google News RSS search
- **Dark Theme:** Toggle in Settings, persisted across sessions
- **No API Keys Required:** All content via public RSS feeds

## Tech Stack

- Kotlin + Jetpack Compose + Material 3
- Retrofit for RSS feed parsing (via rss2json.com)
- GPS via FusedLocationProviderClient + Geocoder
- Gradle 8.9, Android SDK 35, minSdk 26

## Build

```sh
./gradlew assembleDebug
```

APK at `app/build/outputs/apk/debug/app-debug.apk`
