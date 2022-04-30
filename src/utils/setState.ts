import { IForm, IFormData, IOptionsType } from 'src/types'

export const setStateOnSubmit = (
  formState: IForm,
  formData: IFormData,
  mengenzuschlag: IOptionsType
) => {
  const {
    literpreis,
    litermenge,
    füllstand,
    tankvolumen,
    dieselzuschlag,
    adrzuschlag,
  } = formData

  return {
    ...formState,
    literpreis: parseFloat(JSON.stringify(transformPreis(literpreis))),
    füllstand: Number(füllstand) / 100,
    tankvolumen: Number(tankvolumen),
    liter: parseFloat(litermenge),
    zuschlag: mengenzuschlag.value,
    dieselzuschlag: Number(dieselzuschlag),
    adr: Boolean(adrzuschlag) === true ? 11 : 0,
  }
}

export const transformPreis = (preis: string) => {
  const replacedComma = preis.replace(',', '.')
  return parseFloat(replacedComma) < 1
    ? parseFloat(replacedComma)
    : parseFloat(replacedComma) / 100
}
