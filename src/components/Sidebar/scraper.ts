import cheerio from 'cheerio'

export default async function scraperBDEV() {
  const res = await fetch(
    `https://www.energieverbraucher.de/de/preisabfrage__1101/`
  )

  const buffer = await res.text()
  const $ = cheerio.load(buffer)

  const regionen: {
    [x: string]: {
      plz: string
      brutto1000: string
      netto1000: string
      brutto3000: string
      netto3000: string
    }
  }[] = []

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

  const getOptions = (data: any[]) => {
    return data.map((item, index) => ({
      id: index + 1,
      name: Object.keys(item)[0],
      value: item[Object.keys(item)[0]].netto1000,
      unavailable: false,
      plz: item[Object.keys(item)[0]].plz,
    }))
  }

  return getOptions(regionen)
}
