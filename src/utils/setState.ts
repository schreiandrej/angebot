import { IForm, IFormData } from 'src/types'
import { currentMwstFactor } from './variables'

export const setStateOnSubmit = (
  formState: IForm,
  formData: IFormData,
  tankvolumen: number
) => {
  const {
    literpreis,
    liefermenge,
    füllstand,
    mengenzuschlag,
    dieselzuschlag,
    gefahrgutzuschlag,
    vorkasse,
    guthaben,
  } = formData

  const getLiefermenge = (
    vorkasse: number | string,
    mengenzuschlag: number,
    dieselzuschlag: number,
    gefahrgutzuschlag: number,
    literpreis: number,
    liefermenge: number | string,
    füllstand: number | string,
    currentMwstFactor: number
  ) => {
    if (vorkasse !== '') {
      return Number(
        (Number(vorkasse) / currentMwstFactor -
          (dieselzuschlag + gefahrgutzuschlag + mengenzuschlag)) /
          (literpreis / 100)
      ).toFixed(0)
    } else if (liefermenge === '' && füllstand !== '') {
      return Math.floor(tankvolumen * ((85 - Number(füllstand)) / 100))
    }

    return Number(liefermenge)
  }

  return {
    ...formState,
    literpreis: parseFloat(transformPreis(literpreis)),
    füllstand: Number(füllstand),
    tankvolumen: tankvolumen,
    liefermenge: getLiefermenge(
      vorkasse,
      mengenzuschlag,
      dieselzuschlag,
      gefahrgutzuschlag,
      literpreis,
      liefermenge,
      füllstand,
      currentMwstFactor
    ),
    mengenzuschlag: mengenzuschlag,
    dieselzuschlag: dieselzuschlag,
    gefahrgutzuschlag: gefahrgutzuschlag,
    vorkasse: Number(vorkasse),
    guthaben: guthaben,
  }
}

export const transformPreis = (literpreis: number | string) => {
  const dezimalPreis =
    Number(literpreis) > 10 ? Number(literpreis) / 100 : Number(literpreis)

  return dezimalPreis.toFixed(4).replace(',', '.')
}
