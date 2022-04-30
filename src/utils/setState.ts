import { IForm, IFormData, IOptionsType } from 'src/types'

export const setStateOnSubmit = (
  formState: IForm,
  formData: IFormData,
  tankvolumen: IOptionsType,
  mengenzuschlag: IOptionsType
) => {
  const {
    literpreis,
    liefermenge,
    füllstand,
    dieselzuschlag,
    adrzuschlag,
    vorkasse,
  } = formData

  return {
    ...formState,
    literpreis: parseFloat(transformPreis(literpreis)),
    füllstand: Number(füllstand),
    tankvolumen: Number(tankvolumen.value),
    liefermenge: parseFloat(liefermenge),
    mengenzuschlag: mengenzuschlag.value,
    dieselzuschlag: Boolean(dieselzuschlag) === true ? 4.2 : 0,
    adrzuschlag: Boolean(adrzuschlag) === true ? 11 : 0,
    vorkasse: Number(vorkasse),
  }
}

export const transformPreis = (literpreis: string) => {
  const dezimalPreis =
    Number(literpreis) > 10 ? Number(literpreis) / 100 : Number(literpreis)

  return dezimalPreis.toFixed(4).replace(',', '.')
}
