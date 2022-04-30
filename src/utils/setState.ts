import { IForm, IFormData, IOptionsType } from 'src/types'
import { currentMwstFactor } from './variables'

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

  const getLiefermenge = (
    vorkasse: string,
    dieselzuschlag: string,
    adrzuschlag: string,
    literpreis: string,
    liefermenge: string,
    currentMwstFactor: number
  ) => {
    if (vorkasse !== '') {
      return Number(
        (
          (Number(vorkasse) -
            ((Boolean(dieselzuschlag) === true ? 4.2 : 0) +
              (Boolean(adrzuschlag) === true ? 11 : 0) +
              mengenzuschlag.value) *
              currentMwstFactor) /
          ((parseFloat(literpreis) / 100) * currentMwstFactor)
        ).toFixed(0)
      )
    }
    return Number(liefermenge)
  }

  return {
    ...formState,
    literpreis: parseFloat(transformPreis(literpreis)),
    füllstand: Number(füllstand),
    tankvolumen: Number(tankvolumen.value),
    liefermenge: getLiefermenge(
      vorkasse,
      dieselzuschlag,
      adrzuschlag,
      literpreis,
      liefermenge,
      currentMwstFactor
    ),
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
