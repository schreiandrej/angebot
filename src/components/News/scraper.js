import cheerio from 'cheerio'


export default async function scraperNews() {
  const res = await fetch(`https://www.presseportal.de/st/Fl%C3%BCssiggas`)

  const buffer = await res.text()
  const $ = cheerio.load(buffer)

  const articles= []

  $('article').each(function (i, el) {
    articles[i] = {
      text: $(this).find('.news-headline-clamp').children().attr('title'),
      url: $(this).data('url'),
    }
  })

  if (!buffer) {
    return {
      notFound: true,
    }
  }

  return articles
}
