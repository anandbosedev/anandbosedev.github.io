package dev.anandbose.ui.app

import anandbose.composeapp.generated.resources.Res
import anandbose.composeapp.generated.resources.social_bluesky
import anandbose.composeapp.generated.resources.social_github
import anandbose.composeapp.generated.resources.social_linkedin
import anandbose.composeapp.generated.resources.social_mastodon
import anandbose.composeapp.generated.resources.social_medium
import anandbose.composeapp.generated.resources.social_twitter
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
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.text.buildAnnotatedString
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import coil3.compose.AsyncImage
import dev.anandbose.data.Links
import dev.anandbose.ui.util.styledLink
import dev.anandbose.ui.widget.UrlButtonLarge
import dev.anandbose.ui.widget.UrlButtonSmall
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
                //val scrollState = rememberScrollState()
                Column(
                    modifier = Modifier
                        .widthIn(max = 760.dp)
                        .padding(horizontal = 32.dp),
                        //.verticalScroll(state = scrollState),
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
                        LazyVerticalGrid(
                            modifier = Modifier.padding(top = 32.dp),
                            columns = GridCells.Adaptive(minSize = 200.dp),
                            horizontalArrangement = Arrangement.spacedBy(16.dp),
                            verticalArrangement = Arrangement.spacedBy(16.dp),
                        ) {
                            items(items = Links) {
                                UrlButtonLarge(
                                    modifier = Modifier.fillMaxWidth(),
                                    icon = painterResource(it.icon),
                                    text = it.title,
                                    url = it.url,
                                )
                            }
                        }
                    } else {
                        LazyColumn(
                            modifier = Modifier.padding(top = 32.dp),
                            verticalArrangement = Arrangement.spacedBy(16.dp),
                        ) {
                            items(items = Links) {
                                UrlButtonSmall(
                                    modifier = Modifier.fillMaxWidth(),
                                    icon = painterResource(it.icon),
                                    text = it.title,
                                    url = it.url,
                                )
                            }
                        }
                    }
                    Text(
                        modifier = Modifier.padding(vertical = 32.dp),
                        text = buildAnnotatedString {
                            append("This website is built with ")
                            styledLink(
                                url = "https://www.jetbrains.com/compose-multiplatform/",
                                text = "Compose Multiplatform",
                            )
                            append(" and ")
                            styledLink(
                                url = "https://kotlinlang.org/docs/wasm-overview.html",
                                text = "Kotlin/WASM",
                            )
                            append(". The icons are sourced from ")
                            styledLink(
                                url = "https://icons8.com",
                                text = "icons8.com",
                            )
                            append(" and converted to Vector Drawable using ")
                            styledLink(
                                url = "https://shapeshifter.design",
                                text = "ShapeShifter",
                            )
                            append(". Source code is available on ")
                            styledLink(
                                url = "https://github.com/anandbosedev/anandbosedev.github.io",
                                text = "GitHub",
                            )
                            append(".")
                        },
                        textAlign = TextAlign.Center,
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                    )
                }
            }
        }
    }
}



