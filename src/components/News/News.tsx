import { Container } from '@/components/Base/Container'
import { Carousel } from '@/components/Base/Carousel'

type NewsProps = {
  articles: {
    text: string | undefined
    url: string
  }[]
  className?: string
}

export const News = ({ articles, className }: NewsProps) => {
  return (
    <Container className={`${className}`}>
      <Carousel>
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
      </Carousel>
    </Container>
  )
}
