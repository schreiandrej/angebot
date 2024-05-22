import { FormType } from 'app/types'
import { getLiefermenge } from './getLiefermenge'
import { currentMwstFactor } from './constants'

export const setStateOnSubmit = (
  formState: FormType,
  formData: FormType,
  tankvolumen: number
) => {
  const {
    literpreis,
    liefermenge,
    füllstand,
    mengenzuschlag,
    energiezuschlag,
    gefahrgutzuschlag,
    vorkasse,
    guthaben,
    checkboxADRZuschlag,
    checkboxMengenzuschlag,
  } = formData

  const calcLiefermenge = getLiefermenge(
    literpreis,
    liefermenge,
    füllstand,
    mengenzuschlag,
    energiezuschlag,
    gefahrgutzuschlag,
    vorkasse,
    guthaben,
    tankvolumen,
    currentMwstFactor
  )

  return {
    ...formState,
    literpreis: literpreis,
    füllstand: füllstand,
    tankvolumen: tankvolumen,
    liefermenge: calcLiefermenge,
    mengenzuschlag: mengenzuschlag,
    energiezuschlag: energiezuschlag,
    gefahrgutzuschlag: gefahrgutzuschlag,
    vorkasse: Number(vorkasse),
    guthaben: guthaben,
    checkboxADRZuschlag: checkboxADRZuschlag,
    checkboxMengenzuschlag: checkboxMengenzuschlag,
  }
}
