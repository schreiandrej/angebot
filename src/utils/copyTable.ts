export const copyTable = () => {
  const el = document?.querySelector('table')
  const range = document.createRange()
  const sel = window.getSelection()
  sel?.removeAllRanges()
  try {
    range.selectNodeContents(el as Node)
    sel?.addRange(range)
  } catch (e) {
    range.selectNode(el as Node)
    sel?.addRange(range)
  }
  document.execCommand('Copy')
  sel?.empty()
}
