import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatNumber = (num: number) =>
  new Intl.NumberFormat('de-DE', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(num)

export async function copyTable() {
  const elTable = document.querySelector('table')

  if (elTable) {
    // Add inline CSS styles to the table
    elTable.style.borderCollapse = 'collapse'
    elTable.style.border = '1px solid red'

    const cells = elTable.querySelectorAll('th, td')
    cells.forEach((cell: Element) => {
      const cellElement = cell as HTMLElement
      cellElement.style.border = '1px solid red'
      cellElement.style.padding = '5px'
    })
  }

  let range, sel

  // Ensure that range and selection are supported by the browsers
  if (elTable && document.createRange && window.getSelection) {
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
