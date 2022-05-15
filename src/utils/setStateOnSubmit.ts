import { IForm } from 'src/types'
import { getLiefermenge } from './getLiefermenge'
import { transformPreis } from './transformpreis'
import { currentMwstFactor } from './variables'

export const setStateOnSubmit = (
  formState: IForm,
  formData: IForm,
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

  const calcLiefermenge = getLiefermenge(
    literpreis,
    liefermenge,
    füllstand,
    mengenzuschlag,
    dieselzuschlag,
    gefahrgutzuschlag,
    vorkasse,
    guthaben,
    tankvolumen,
    currentMwstFactor
  )

  return {
    ...formState,
    literpreis: parseFloat(transformPreis(literpreis)),
    füllstand: füllstand,
    tankvolumen: tankvolumen,
    liefermenge: calcLiefermenge,
    mengenzuschlag: mengenzuschlag,
    dieselzuschlag: dieselzuschlag,
    gefahrgutzuschlag: gefahrgutzuschlag,
    vorkasse: Number(vorkasse),
    guthaben: guthaben,
  }
}
