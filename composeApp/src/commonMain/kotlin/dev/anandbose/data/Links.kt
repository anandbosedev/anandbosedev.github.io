package dev.anandbose.data

import anandbose.composeapp.generated.resources.Res
import anandbose.composeapp.generated.resources.social_bluesky
import anandbose.composeapp.generated.resources.social_github
import anandbose.composeapp.generated.resources.social_linkedin
import anandbose.composeapp.generated.resources.social_mastodon
import anandbose.composeapp.generated.resources.social_medium
import anandbose.composeapp.generated.resources.social_twitter
import androidx.compose.runtime.Immutable
import androidx.compose.runtime.Stable
import org.jetbrains.compose.resources.DrawableResource

@Stable
@Immutable
data class LinkData(
    val icon: DrawableResource,
    val title: String,
    val url: String,
)

val Links = listOf(
    LinkData(
        icon = Res.drawable.social_medium,
        title = "Medium",
        url = "https://medium.com/@anandbose"
    ),
    LinkData(
        icon = Res.drawable.social_linkedin,
        title = "LinkedIn",
        url = "https://linkedin.com/in/anandbosedev",
    ),
    LinkData(
        icon = Res.drawable.social_github,
        title = "GitHub",
        url = "https://github.com/anandbosedev",
    ),
    LinkData(
        icon = Res.drawable.social_mastodon,
        title = "Mastodon",
        url = "https://mastodon.social/@anandbosedev",
    ),
    LinkData(
        icon = Res.drawable.social_bluesky,
        title = "Bluesky",
        url = "https://bsky.app/profile/anandbose.dev",
    ),
    LinkData(
        icon = Res.drawable.social_twitter,
        title = "Twitter",
        url = "https://x.com/@anandbosedev",
    ),
)