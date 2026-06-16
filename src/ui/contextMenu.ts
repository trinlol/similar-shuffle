import { startFromContextMenu } from "../services/shuffleEngine"
import { syncSimilarShuffleFromPlayback } from "./similarShuffleUiState"
import { pickSeedFromCollection } from "../sources/profileTracks"
import { isPlaylistContext, isValidPlaybackContext } from "../queue/queueManager"

let contextMenuRegistered = false

const runPlayWithSimilarShuffle = (uris: string[]) => {
  Spicetify.showNotification("Building Similar Shuffle queue...")
  setTimeout(() => {
    handlePlayWithSimilarShuffle(uris).catch((error) => {
      console.error("[Similar Shuffle]", error)
      Spicetify.showNotification(
        error instanceof Error ? error.message : "Similar Shuffle failed",
        true
      )
    })
  }, 100)
}

const getUriType = (uri: string): string | null => {
  try {
    if (!Spicetify.URI) return null
    return Spicetify.URI.fromString(uri).type
  } catch {
    return null
  }
}

const isTrackUri = (uri: string) => {
  if (uri.startsWith("spotify:track:")) return true
  const { Type } = Spicetify.URI ?? {}
  if (!Type) return false
  return getUriType(uri) === Type.TRACK
}

const isArtistUri = (uri: string) => {
  if (uri.startsWith("spotify:artist:")) return true
  const { Type } = Spicetify.URI ?? {}
  if (!Type) return false
  return getUriType(uri) === Type.ARTIST
}

const isAlbumUri = (uri: string) => {
  if (uri.startsWith("spotify:album:")) return true
  const { Type } = Spicetify.URI ?? {}
  if (!Type) return false
  return getUriType(uri) === Type.ALBUM
}

const isPlaylistOnly = (uris: string[]): boolean => {
  if (!uris?.length || uris.length > 1) return false
  return isPlaylistContext(uris[0])
}

const isNonPlaylist = (uris: string[]): boolean => {
  if (!uris?.length) return false

  try {
    if (uris.length > 1) {
      return uris.every(isTrackUri)
    }

    const uri = uris[0]
    return isTrackUri(uri) || isArtistUri(uri) || isAlbumUri(uri)
  } catch {
    return uris.some(
      (uri) =>
        uri.startsWith("spotify:track:") ||
        uri.startsWith("spotify:artist:") ||
        uri.startsWith("spotify:album:")
    )
  }
}

const handlePlayWithSimilarShuffle = async (uris: string[]) => {
  const seedUri = await pickSeedFromCollection(uris)
  if (!seedUri) {
    Spicetify.showNotification("Nothing to play", true)
    return
  }

  const rawContext =
    uris.length === 1 && isValidPlaybackContext(uris[0]) ? uris[0] : null
  const contextUri = rawContext

  await startFromContextMenu(seedUri, contextUri)
  syncSimilarShuffleFromPlayback()
}


export const registerContextMenu = () => {
  if (contextMenuRegistered) return

  if (!Spicetify.ContextMenu?.Item) {
    throw new Error("Spicetify.ContextMenu.Item is not available")
  }

  new Spicetify.ContextMenu.Item(
    "Play with Similar Shuffle",
    runPlayWithSimilarShuffle,
    isNonPlaylist,
    "enhance"
  ).register()

  new Spicetify.ContextMenu.Item(
    "Play with Similar Shuffle",
    runPlayWithSimilarShuffle,
    isPlaylistOnly,
    "enhance"
  ).register()

  contextMenuRegistered = true
  console.info("[Similar Shuffle] Context menus registered")
}
