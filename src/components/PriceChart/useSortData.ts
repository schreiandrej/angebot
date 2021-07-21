import { format, differenceInCalendarDays } from 'date-fns'

export const useSortData = (preisliste, postleitzahl, searchedDate, period) => {
  const labels = []
  const values = []
  const arr = []

  // Die Daten in der Datenbank laufen immer bis zum Ende des Jahre, deswegen muss die Ausgabe bis zum heutigen Tag gekürzt werden.
  const realArrayLegnth = differenceInCalendarDays(
    new Date('2021-12-31'),
    new Date()
  )

  let endOfpreisliste = preisliste.length - realArrayLegnth

  for (let i = endOfpreisliste - 1; i !== 0; i--) {
    arr.push(preisliste[endOfpreisliste - i])
  }

  if (period === 0) period = arr.length
  // Arrays für das Chart aufbereiten
  arr.map((item, index) => {
    if (index > arr.length - period) {
      labels.push(format(new Date(item['Datum']), 'dd.MM.yy'))
      values.push(item[postleitzahl])
    }
  })

  // Das gesuchte Datum für die Ausgabe formatiern
  const date = format(new Date(searchedDate), 'dd.MM.yy')

  // Preis heute
  const today = values[values.length - 1]

  // Preis suche für das gesuchte Datum
  const dateIndex = labels.indexOf(date)
  const preis = values[dateIndex]

  return { values, labels, date, postleitzahl, preis, today }
}

export const showDiffrentPeriods = (preisliste, postleitzahl, period) => {
  const labels = []
  const values = []
  const arr = []

  // Die Daten in der Datenbank laufen immer bis zum Ende des Jahre, deswegen muss die Ausgabe bis zum heutigen Tag gekürzt werden.
  const realArrayLegnth = differenceInCalendarDays(
    new Date('2021-12-31'),
    new Date()
  )

  let endOfpreisliste = preisliste.length - realArrayLegnth

  for (let i = endOfpreisliste - 1; i !== 0; i--) {
    arr.push(preisliste[endOfpreisliste - i])
  }

  return { values, labels }
}
