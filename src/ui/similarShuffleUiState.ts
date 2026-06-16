type UiSyncHandler = () => void

let syncHandler: UiSyncHandler | null = null

export const registerSimilarShuffleUiSync = (handler: UiSyncHandler) => {
  syncHandler = handler
}

export const syncSimilarShuffleFromPlayback = () => {
  syncHandler?.()
}
