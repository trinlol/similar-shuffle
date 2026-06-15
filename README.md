# Better Shuffle

A Spicetify extension that replaces Spotify's profile-heavy autoplay with a progressive shuffle. It starts with tracks similar in genre and era to your seed song, then gradually blends in your liked songs and playlists.

![Spicetify Better Shuffle](preview-banner.png)

## Install

### Marketplace (recommended)

1. Install [Spicetify](https://spicetify.app/docs/getting-started) and the [Marketplace](https://spicetify.app/docs/getting-started) extension
2. Open **Spicetify → Marketplace → Extensions**
3. Search for **Better Shuffle** and click **Install**
4. Restart Spotify if prompted

### Manual

Download `better-shuffle.js` from this repository and copy it to your Spicetify Extensions folder:

| Platform | Path |
|----------|------|
| Windows | `%appdata%\spicetify\Extensions\` |
| Linux | `~/.config/spicetify/Extensions/` |
| macOS | `~/spicetify_data/Extensions/` |

Then enable the extension:

```bash
spicetify config extensions better-shuffle.js
spicetify apply
```

## Features

- **Play with Better Shuffle** context menu on tracks, albums, and artists
- **Similar Shuffle** context menu on playlists — plays recommendations similar to the playlist instead of reshuffling its tracks
- **Dedicated playbar button** for Better Shuffle (separate from Spotify shuffle)
- **Native shuffle is blocked** while Better Shuffle is active
- Progressive blend curve: similar tracks first, library/playlists later
- **Play similar songs** modes for songs, playlists, and artists (recommendations-only, blend, or strict)
- Multi-strategy recommendations: Spotify radio, inspired-by mixes, genre/era search, related artists, and album peers
- True shuffle with artist spacing and recent-play deprioritization
- Settings for era window, queue size, refill threshold, and more

## Usage

1. Right-click a track, album, or artist and choose **Play with Better Shuffle**
2. Right-click a playlist and choose **Similar Shuffle** to play songs similar to that playlist (not the playlist's own tracks)
3. Or click the **Better Shuffle** button (left of Spotify shuffle) in the playbar: first click enables, second reshuffles (hover shows refresh), third turns off
4. While Better Shuffle is on, Spotify's built-in shuffle is greyed out and unclickable
5. Open **Profile menu (top right icon) → Better Shuffle** to adjust settings

### Play similar songs

Better Shuffle can build queues from Spotify recommendations instead of only your library or collection:

| Context | How to start | Default behavior |
|---------|--------------|------------------|
| **Playlist** | Right-click → **Similar Shuffle** | Recommendations only (tracks similar to the playlist, excluding songs already in it) |
| **Track** | Right-click → **Play with Better Shuffle** | Progressive blend (similar first, then your library) |
| **Artist** | Right-click → **Play with Better Shuffle** | Recommendations only (tracks similar to the artist) |
| **Album** | Right-click → **Play with Better Shuffle** | Progressive blend |

For playlists, Better Shuffle samples tracks spread across the playlist and merges multiple recommendation sources (radio stations, inspired-by mixes, genre/era matches, related artists, and album peers) to find similar songs.

Change how similar vs. collection tracks are mixed in **Profile menu → Better Shuffle**:

- **Song blend mode** — Progressive, Balanced, Recommendations Only, or Library Only
- **Playlist shuffle mode** — Strict (playlist tracks only), Blend (playlist + recommendations), or Recommendations Only
- **Artist shuffle mode** — Strict (artist catalog only), Blend (artist + similar), or Recommendations Only

## License

MIT — see [LICENSE](LICENSE).
