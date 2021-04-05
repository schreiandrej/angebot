import { Title } from '@/components/base/title'
import { Container } from '@/components/base/container'
import { Slider } from '@/components/base/slider'

export const News = ({ articles, className }) => {
  return (
    <Container className={`${className}`}>
      <Title>News</Title>
      <Slider>
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
    </Container>
  )
}
