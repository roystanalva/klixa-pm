package com.opencode.flowerrates.ui.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

private val LightColorScheme = lightColorScheme(
    primary = JasmineGreen,
    onPrimary = Color.White,
    primaryContainer = JasmineCream,
    secondary = JasmineGold,
    onSecondary = TextPrimary,
    background = BackgroundLight,
    onBackground = TextPrimary,
    surface = CardBackground,
    onSurface = TextPrimary,
    surfaceVariant = JasmineCream,
    onSurfaceVariant = TextSecondary,
    outline = Color(0xFFDDD7D0),
)

@Composable
fun FlowerRatesTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = LightColorScheme,
        content = content
    )
}
