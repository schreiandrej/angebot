import { Slider } from 'sa-tw-lib'

type NewsProps = {
  articles: {
    text: string | undefined
    url: string
  }[]
  className?: string
}

export const News = ({ articles, className }: NewsProps) => {
  return (
    <div className={`${className}`}>
      <Slider className=''>
        {articles.map((article, index) => {
          return (
            <h3 className='min-w-full px-4 text-center' key={index}>
              <a
                className='hover:text-hover'
                href={`https://www.presseportal.de${article.url}`}
              >
                {article.text}
              </a>
            </h3>
          )
        })}
      </Slider>
    </div>
  )
}
