import { IForm, IOptionsType } from 'src/types'

export const transformPreis = (preis: string) => {
  const replacedComma = preis.replace(',', '.')
  return parseFloat(replacedComma) < 1
    ? parseFloat(replacedComma)
    : parseFloat(replacedComma) / 100
}

export const calculateTotalAmount = (
  literpreis: number,
  liter: number,
  zuschlag: number,
  adr: number
) => {
  return (literpreis * liter + zuschlag + adr) * 1.19
}

export const setStateOnSubmit = (
  formState: IForm,
  liter: string,
  preis: string,
  selectedOption: IOptionsType,
  adr: string
) => {
  return {
    ...formState,
    liter: parseFloat(liter),
    literpreis: parseFloat(JSON.stringify(transformPreis(preis))),
    zuschlag: selectedOption.value,
    adr: Boolean(adr) === true ? 11 : 0,
  }
}
