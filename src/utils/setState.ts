import { IForm, IOptionsType } from 'src/types'

export const setStateOnSubmit = (
  formState: IForm,
  liter: string,
  preis: string,
  selectedOption: IOptionsType,
  adr: string,
  füllstand: string,
  tankvolumen: string
) => {
  return {
    ...formState,
    literpreis: parseFloat(JSON.stringify(transformPreis(preis))),
    füllstand: Number(füllstand) / 100,
    tankvolumen: Number(tankvolumen),
    liter: parseFloat(liter),
    zuschlag: selectedOption.value,
    dieselzuschlag: 4.2,
    adr: Boolean(adr) === true ? 11 : 0,
  }
}

export const transformPreis = (preis: string) => {
  const replacedComma = preis.replace(',', '.')
  return parseFloat(replacedComma) < 1
    ? parseFloat(replacedComma)
    : parseFloat(replacedComma) / 100
}
