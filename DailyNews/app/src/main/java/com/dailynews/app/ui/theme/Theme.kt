package com.dailynews.app.ui.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable

private val LightColorScheme = lightColorScheme(
    primary = Blue600,
    onPrimary = White,
    primaryContainer = Blue100,
    onPrimaryContainer = Blue700,
    secondary = Gray700,
    onSecondary = White,
    background = White,
    onBackground = Gray900,
    surface = White,
    onSurface = Gray900,
    surfaceVariant = Gray100,
    onSurfaceVariant = Gray700,
    outline = Gray200,
)

private val DarkColorScheme = darkColorScheme(
    primary = Blue100,
    onPrimary = Gray900,
    primaryContainer = Blue700,
    onPrimaryContainer = Blue100,
    secondary = Gray500,
    onSecondary = Gray900,
    background = Gray900,
    onBackground = Gray100,
    surface = Gray800,
    onSurface = Gray100,
    surfaceVariant = Gray700,
    onSurfaceVariant = Gray200,
    outline = Gray500,
)

@Composable
fun DailyNewsTheme(darkTheme: Boolean = false, content: @Composable () -> Unit) {
    val colorScheme = if (darkTheme) DarkColorScheme else LightColorScheme
    MaterialTheme(
        colorScheme = colorScheme,
        content = content
    )
}
