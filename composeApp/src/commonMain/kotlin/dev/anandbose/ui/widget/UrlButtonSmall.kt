package dev.anandbose.ui.widget

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.ColorFilter
import androidx.compose.ui.graphics.painter.Painter
import androidx.compose.ui.unit.dp
import kotlinx.browser.window

@Composable
fun UrlButtonSmall(
    modifier: Modifier = Modifier,
    icon: Painter,
    text: String,
    url: String,
) {
    Button(
        modifier = modifier,
        content = {
            Image(
                modifier = Modifier.size(32.dp),
                painter = icon,
                contentDescription = null,
                colorFilter = ColorFilter.tint(
                    color = MaterialTheme.colorScheme.onPrimary,
                ),
            )
            Text(
                modifier = Modifier.padding(start = 4.dp),
                text = text,
                style = MaterialTheme.typography.labelLarge,
            )
        },
        onClick = {
            window.open(url, "_blank")
        }
    )
}