export async function copyTable() {
  const elTable = document.querySelector('table')

  let range, sel

  // Ensure that range and selection are supported by the browsers
  if (document.createRange && window.getSelection && elTable) {
    range = document.createRange()
    sel = window.getSelection()
    // unselect any element in the page
    sel?.removeAllRanges()

    try {
      range.selectNodeContents(elTable)
      sel?.addRange(range)
    } catch (e) {
      range.selectNode(elTable)
      sel?.addRange(range)
    }

    document.execCommand('copy')
  }

  sel?.removeAllRanges()
}
