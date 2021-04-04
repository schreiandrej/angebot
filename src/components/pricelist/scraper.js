import cheerio from 'cheerio'

export default async function scraperBDEV() {
  const res = await fetch(
    `https://www.energieverbraucher.de/de/preisabfrage__1101/`
  )

  const buffer = await res.text()
  const $ = cheerio.load(buffer)

  const mitte1 = $('tr').eq(4).children().last().text()
  const mitte2 = $('tr').eq(5).children().last().text()
  const nordWest2 = $('tr').eq(13).children().last().text()

  if (!buffer) {
    return {
      notFound: true,
    }
  }

  return { mitte1, mitte2, nordWest2 }
}
