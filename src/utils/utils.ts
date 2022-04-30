import { currentMwstFactor } from './variables'

export const calculate = (
  literpreis: number,
  liter: number,
  zuschlag: number,
  dieselzuschlag: number,
  füllstand: number,
  tankvolumen: number,
  adr: number
) => {
  const litermenge =
    (literpreis * (tankvolumen * (füllstand / 100)) +
      zuschlag +
      adr +
      dieselzuschlag) *
    currentMwstFactor

  const gesamtpreis =
    (literpreis * (liter !== 0 ? liter : litermenge) +
      zuschlag +
      adr +
      dieselzuschlag) *
    currentMwstFactor

  return {
    litermenge,
    gesamtpreis,
  }
}
