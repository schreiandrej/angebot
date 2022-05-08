import { Dispatch, SetStateAction } from 'react'
import { IForm, IFormData, IOptionsType } from 'src/types'
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
    vorkasse: string,
    mengenzuschlag: string,
    dieselzuschlag: string,
    gefahrgutzuschlag: string,
    literpreis: string,
    liefermenge: string,
    füllstand: string,
    currentMwstFactor: number
  ) => {
    if (vorkasse !== '') {
      return Number(
        (
          Number(vorkasse) -
          (Number(dieselzuschlag.replace(',', '.')) +
            (Number(gefahrgutzuschlag.replace(',', '.')) +
              Number(mengenzuschlag.replace(',', '.'))) *
              currentMwstFactor) /
            ((parseFloat(literpreis) / 100) * currentMwstFactor)
        ).toFixed(0)
      )
    } else if (liefermenge === '' && füllstand !== '') {
      return Math.floor(tankvolumen * ((85 - Number(füllstand)) / 100))
    }

    return Number(liefermenge)
  }

  return {
    ...formState,
    literpreis: parseFloat(transformPreis(literpreis)),
    füllstand: Number(füllstand),
    tankvolumen: Number(tankvolumen),
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
    mengenzuschlag: Number(mengenzuschlag.replace(',', '.')),
    dieselzuschlag: Number(dieselzuschlag.replace(',', '.')),
    gefahrgutzuschlag: Number(gefahrgutzuschlag.replace(',', '.')),
    vorkasse: Number(vorkasse),
    guthaben: Number(guthaben.replace(',', '.')),
  }
}

export const transformPreis = (literpreis: string) => {
  const dezimalPreis =
    Number(literpreis) > 10 ? Number(literpreis) / 100 : Number(literpreis)

  return dezimalPreis.toFixed(4).replace(',', '.')
}
