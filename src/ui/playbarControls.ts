export const SIMILAR_SHUFFLE_TEST_ID = "similar-shuffle-button"

export const NATIVE_SHUFFLE_SELECTORS = [
  `button[data-testid="control-button-shuffle"]:not([data-testid="${SIMILAR_SHUFFLE_TEST_ID}"])`,
  `.main-shuffleButton-button:not([data-testid="${SIMILAR_SHUFFLE_TEST_ID}"])`,
]

export const isSimilarShuffleButton = (element: Element | null): boolean =>
  element instanceof HTMLButtonElement &&
  element.getAttribute("data-testid") === SIMILAR_SHUFFLE_TEST_ID

const isNativeShuffleLabel = (label: string): boolean => {
  const normalized = label.toLowerCase()
  if (!normalized.includes("shuffle")) return false
  if (normalized.includes("smart")) return false
  if (normalized.includes("similar")) return false
  return true
}

export const findNativeShuffleButton = (): HTMLButtonElement | null => {
  for (const selector of NATIVE_SHUFFLE_SELECTORS) {
    const element = document.querySelector(selector)
    if (element instanceof HTMLButtonElement && !isSimilarShuffleButton(element)) {
      return element
    }
  }

  const playPause = document.querySelector('button[data-testid="control-button-playpause"]')
  const controlGroup = playPause?.parentElement
  if (controlGroup) {
    const byTestId = controlGroup.querySelector('button[data-testid="control-button-shuffle"]')
    if (byTestId instanceof HTMLButtonElement && !isSimilarShuffleButton(byTestId)) {
      return byTestId
    }
  }

  const playbar =
    document.querySelector('[data-testid="now-playing-bar"]') ??
    document.querySelector(".main-nowPlayingBar-nowPlayingBar")

  if (playbar) {
    const buttons = playbar.querySelectorAll("button")
    for (let index = 0; index < buttons.length; index += 1) {
      const button = buttons.item(index)
      if (!(button instanceof HTMLButtonElement)) continue
      if (isSimilarShuffleButton(button)) continue

      const label = button.getAttribute("aria-label") ?? ""
      if (isNativeShuffleLabel(label)) {
        return button
      }
    }
  }

  return null
}

export const isNativeShuffleTarget = (target: EventTarget | null): boolean => {
  if (!(target instanceof Element)) return false
  if (isSimilarShuffleButton(target) || target.closest(`[data-testid="${SIMILAR_SHUFFLE_TEST_ID}"]`)) {
    return false
  }

  const shuffle = findNativeShuffleButton()
  if (shuffle && (target === shuffle || shuffle.contains(target))) return true

  return Boolean(target.closest(NATIVE_SHUFFLE_SELECTORS.join(", ")))
}

export const placeElementBeforeShuffle = (element: HTMLElement): boolean => {
  if (isSimilarShuffleButton(element)) return false

  const shuffleButton = findNativeShuffleButton()
  if (!shuffleButton) return false

  if (element.nextElementSibling !== shuffleButton) {
    shuffleButton.before(element)
  }

  return true
}
