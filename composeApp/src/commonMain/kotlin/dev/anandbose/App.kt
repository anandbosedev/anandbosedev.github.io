package dev.anandbose

import anandbose.composeapp.generated.resources.Res
import anandbose.composeapp.generated.resources.compose_multiplatform
import anandbose.composeapp.generated.resources.social_bluesky
import anandbose.composeapp.generated.resources.social_github
import anandbose.composeapp.generated.resources.social_linkedin
import anandbose.composeapp.generated.resources.social_mastodon
import anandbose.composeapp.generated.resources.social_medium
import anandbose.composeapp.generated.resources.social_twitter
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.BoxWithConstraints
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.widthIn
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.ColorFilter
import androidx.compose.ui.graphics.painter.Painter
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import coil3.compose.AsyncImage
import kotlinx.browser.window
import org.jetbrains.compose.resources.painterResource

@Composable
fun App() {
    MaterialTheme(
        colorScheme = if (isSystemInDarkTheme()) {
            darkColorScheme()
        } else {
            lightColorScheme()
        }
    ) {
        Scaffold(modifier = Modifier.fillMaxSize()) {
            BoxWithConstraints(
                modifier = Modifier.fillMaxSize(),
                contentAlignment = Alignment.TopCenter,
            ) {
                val scrollState = rememberScrollState()
                Column(
                    modifier = Modifier
                        .widthIn(max = 760.dp)
                        .padding(horizontal = 32.dp)
                        .verticalScroll(state = scrollState),
                    horizontalAlignment = Alignment.CenterHorizontally,
                ) {
                    AsyncImage(
                        model = "https://avatars.githubusercontent.com/u/64779880?v=4",
                        modifier = Modifier
                            .padding(top = 32.dp)
                            .clip(CircleShape)
                            .size(size = 128.dp),
                        contentDescription = null
                    )
                    Text(
                        modifier = Modifier.padding(top = 16.dp),
                        text = "Anand Bose",
                        style = MaterialTheme.typography.titleLarge,
                    )
                    Text(
                        modifier = Modifier.padding(top = 8.dp),
                        text = "I'm passionate about building software with Kotlin and Compose.",
                        style = MaterialTheme.typography.labelLarge,
                        textAlign = TextAlign.Center,
                    )
                    if (this@BoxWithConstraints.maxWidth > 480.dp) {
                        Row(
                            modifier = Modifier.padding(top = 48.dp),
                            horizontalArrangement = Arrangement.spacedBy(16.dp),
                        ) {
                            UrlButtonLarge(
                                modifier = Modifier.weight(1f),
                                icon = painterResource(Res.drawable.social_medium),
                                text = "Medium",
                                url = "https://medium.com/@anandbose",
                            )
                            UrlButtonLarge(
                                modifier = Modifier.weight(1f),
                                icon = painterResource(Res.drawable.social_linkedin),
                                text = "LinkedIn",
                                url = "https://linkedin.com/in/anandbosedev",
                            )
                        }
                        Row(
                            modifier = Modifier.padding(top = 16.dp),
                            horizontalArrangement = Arrangement.spacedBy(16.dp),
                        ) {
                            UrlButtonLarge(
                                modifier = Modifier.weight(1f),
                                icon = painterResource(Res.drawable.social_github),
                                text = "GitHub",
                                url = "https://github.com/anandbosedev",
                            )
                            UrlButtonLarge(
                                modifier = Modifier.weight(1f),
                                icon = painterResource(Res.drawable.social_mastodon),
                                text = "Mastodon",
                                url = "https://mastodon.social/@anandbosedev",
                            )
                        }
                        Row(
                            modifier = Modifier.padding(top = 16.dp),
                            horizontalArrangement = Arrangement.spacedBy(16.dp),
                        ) {
                            UrlButtonLarge(
                                modifier = Modifier.weight(1f),
                                icon = painterResource(Res.drawable.social_bluesky),
                                text = "Bluesky",
                                url = "https://bsky.app/profile/anandbose.dev",
                            )
                            UrlButtonLarge(
                                modifier = Modifier.weight(1f),
                                icon = painterResource(Res.drawable.social_twitter),
                                text = "Twitter",
                                url = "https://x.com/@anandbosedev",
                            )
                        }
                    } else {
                        UrlButtonSmall(
                            modifier = Modifier.fillMaxWidth().padding(top = 24.dp),
                            icon = painterResource(Res.drawable.social_medium),
                            text = "Medium",
                            url = "https://medium.com/@anandbose",
                        )
                        UrlButtonSmall(
                            modifier = Modifier.fillMaxWidth().padding(top = 16.dp),
                            icon = painterResource(Res.drawable.social_linkedin),
                            text = "LinkedIn",
                            url = "https://linkedin.com/in/anandbosedev",
                        )
                        UrlButtonSmall(
                            modifier = Modifier.fillMaxWidth().padding(top = 16.dp),
                            icon = painterResource(Res.drawable.social_github),
                            text = "GitHub",
                            url = "https://github.com/anandbosedev",
                        )
                        UrlButtonSmall(
                            modifier = Modifier.fillMaxWidth().padding(top = 16.dp),
                            icon = painterResource(Res.drawable.social_mastodon),
                            text = "Mastodon",
                            url = "https://mastodon.social/@anandbosedev",
                        )
                        UrlButtonSmall(
                            modifier = Modifier.fillMaxWidth().padding(top = 16.dp),
                            icon = painterResource(Res.drawable.social_bluesky),
                            text = "Bluesky",
                            url = "https://bsky.app/profile/anandbose.dev",
                        )
                        UrlButtonSmall(
                            modifier = Modifier.fillMaxWidth().padding(top = 16.dp),
                            icon = painterResource(Res.drawable.social_twitter),
                            text = "Twitter",
                            url = "https://x.com/@anandbosedev",
                        )
                    }
                    Text(
                        modifier = Modifier.padding(vertical = 32.dp),
                        text = "This website is built with Compose Multiplatform and Kotlin/WASM. The icons are sourced from icons8.com",
                        textAlign = TextAlign.Center,
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                    )
                }
            }
        }
    }
}

@Composable
fun UrlButtonLarge(
    modifier: Modifier = Modifier,
    icon: Painter,
    text: String,
    url: String,
) {
    Button(
        modifier = modifier,
        shape = MaterialTheme.shapes.small,
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
            window.open(url, "_blank")
        }
    )
}

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