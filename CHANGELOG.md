# Changelog

All notable changes to Similar Shuffle are documented in this file.

## [1.2.0] - 2026-06-16

### Changed

- **Renamed to Similar Shuffle** — extension, script (`similar-shuffle.js`), marketplace listing, and branding updated from Better Shuffle
- **Unified context menu** — all contexts use **Play with Similar Shuffle**
- **Settings migration** — existing `betterShuffle:*` local storage keys are migrated automatically

## [1.1.0] - 2026-06-15

### Added

- **Playlist shuffle modes** — Strict (playlist tracks only), Blend (playlist + recommendations), and Similar (recommendations only)
- **Artist shuffle modes** — Strict (full discography), Blend (artist + similar), and Similar (recommendations only)
- **Song blend mode setting** — Choose Progressive, Balanced (50/50), Recommendations Only, or Library Only when shuffling from a single track
- **Album support** — Right-click an album to shuffle its tracks with Better Shuffle
- **Artist discography fetching** — Full artist catalog is loaded for artist-context shuffles
- **Similar Shuffle context menu** — Playlists now get a dedicated "Similar Shuffle" entry (tracks/albums/artists keep "Play with Better Shuffle")
- **Multi-seed playlist recommendations** — Playlist similar pools sample tracks spread across the playlist and merge radio, inspired-by, genre/era, and related-artist strategies
- **Large playlist support** — Playlists are paginated up to 2,000 tracks when building shuffle pools
- **Top tracks awareness** — User top tracks are tracked during playlist sessions to improve variety

### Fixed

- **Artist context injection** — Artist pages are now detached from playback context so Spotify no longer injects unwanted tracks into the queue
- **Album context menu** — Albums are recognized and supported in the right-click menu
- **Empty collection seeds** — Clear error messages when a playlist, album, or artist has no playable tracks
- **Playlist track filtering** — Only actual `spotify:track:` URIs are included when reading playlist contents
- **Spicetify.URI lazy access** — URI type checks no longer fail when `Spicetify.URI` is not yet initialized at module load

## [1.0.0] - Initial release

- Progressive shuffle: similar genre/era first, then library/playlists
- Play with Better Shuffle context menu on tracks
- Dedicated playbar toggle with native shuffle blocking
- Settings for era window, queue size, refill threshold, artist spacing, and audio feature matching
