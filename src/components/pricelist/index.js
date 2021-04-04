import { Title } from '@/components/base/title'
import { Container } from '@/components/base/container'
import { ListItem } from '@/components/pricelist/listItem'

export const Preise = ({ data, className }) => {
  const mitte1 = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(parseFloat(data.mitte1.replace(',', '.')))
  const mitte2 = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(parseFloat(data.mitte2.replace(',', '.')))
  const nordWest2 = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(parseFloat(data.nordWest2.replace(',', '.')))

  return (
    <Container className={`${className}`}>
      <Title>aktuelle preise bdev</Title>
      <ol className='w-full sm:px-20'>
        <ListItem gebiet='Mitte I' plz='30,31' price={mitte1} />
        <ListItem gebiet='Nord-West II' plz='32,33' price={nordWest2} />
        <ListItem gebiet='Mitte II' plz='38,39' price={mitte2} />
      </ol>
    </Container>
  )
}
