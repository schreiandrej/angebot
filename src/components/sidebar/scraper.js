import cheerio from 'cheerio'

export default async function scraperBDEV() {
  const res = await fetch(
    `https://www.energieverbraucher.de/de/preisabfrage__1101/`
  )

  const buffer = await res.text()
  const $ = cheerio.load(buffer)

  const regionen = []

  $('.content-segment')
    .children('table')
    .children('tbody')
    .children('tr')
    .map((i, el) => {
      if (i > 3 && i !== 6 && i !== 8 && i !== 9) {
        regionen.push({
          [$('tr').eq(i).children().first().text()]: {
            plz: $('tr').eq(i).children().eq(1).text(),
            brutto1000: $('tr').eq(i).children().eq(2).text(),
            netto1000: $('tr').eq(i).children().eq(3).text(),
            brutto3000: $('tr').eq(i).children().eq(4).text(),
            netto3000: $('tr').eq(i).children().last().text(),
          },
        })
      }
    })

  if (!buffer) {
    return {
      notFound: true,
    }
  }

  return regionen
}
