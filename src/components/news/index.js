import { Container } from '@/components/base/container'
import { Carousel } from '@/components/base/carousel'

export const News = ({ articles, className }) => {
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
