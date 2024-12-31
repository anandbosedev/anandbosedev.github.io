package dev.anandbose.ui.widget

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.size
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.ColorFilter
import androidx.compose.ui.graphics.painter.Painter
import androidx.compose.ui.platform.LocalUriHandler
import androidx.compose.ui.unit.dp

@Composable
fun UrlButtonLarge(
    modifier: Modifier = Modifier,
    icon: Painter,
    text: String,
    url: String,
) {
    val uriHandler = LocalUriHandler.current
    Button(
        modifier = modifier,
        shape = MaterialTheme.shapes.medium,
        content = {
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.spacedBy(4.dp),
            ) {
                Image(
                    modifier = Modifier.size(48.dp),
                    painter = icon,
                    contentDescription = null,
                    colorFilter = ColorFilter.tint(
                        color = MaterialTheme.colorScheme.onPrimary,
                    ),
                )
                Text(
                    text = text,
                    style = MaterialTheme.typography.labelLarge,
                )
            }
        },
        onClick = {
            uriHandler.openUri(url)
        }
    )
}