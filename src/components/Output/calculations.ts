import { currentMwstFactor } from '../../utils/variables'

export const calcPreisProLiter = (preisProLiter: number) => {
  return {
    netto: `${preisProLiter.toFixed(4).replace('.', ',')} €`,
    brutto: `${(preisProLiter * currentMwstFactor)
      .toFixed(4)
      .replace('.', ',')} €`,
  }
}

export const calcPreisGesamtmenge = (
  preisProLiter: number,
  liefermenge: number
) => {
  return {
    netto: `${(preisProLiter * liefermenge).toFixed(2).replace('.', ',')} €`,
    brutto: `${(preisProLiter * liefermenge * currentMwstFactor)
      .toFixed(2)
      .replace('.', ',')} €`,
  }
}

export const calcMengenzuschlag = (mengenzuschlag: number) => {
  return {
    netto: `${mengenzuschlag.toFixed(2).replace('.', ',')} €`,
    brutto: `${(mengenzuschlag * currentMwstFactor)
      .toFixed(2)
      .replace('.', ',')} €`,
  }
}

export const calcGefahrgutzuschlag = (gefahrgutzuschlag: number | string) => {
  return {
    netto: `${Number(gefahrgutzuschlag).toFixed(2).replace('.', ',')} €`,
    brutto: `${(Number(gefahrgutzuschlag) * currentMwstFactor)
      .toFixed(2)
      .replace('.', ',')} €`,
  }
}

export const calcEnergiezuschlag = (energiezuschlag: number | string) => {
  return {
    netto: `${Number(energiezuschlag).toFixed(2).replace('.', ',')} €`,
    brutto: `${(Number(energiezuschlag) * currentMwstFactor)
      .toFixed(2)
      .replace('.', ',')} €`,
  }
}

export const calcGuthaben = (guthaben: number | string) => {
  return `${Number(guthaben).toFixed(2).replace('.', ',')} €`
}

export const calcGesamtPreis = (
  preis: number,
  lietermenge: number,
  mengenzuschlag: number,
  gefahrgutzuschlag: number | string,
  energiezuschlag: number | string,
  guthaben: number,
  checkboxADRZuschlag: boolean,
  checkboxMengenzuschlag: boolean
) => {
  const nettoGesamtpreis =
    preis * lietermenge +
    (checkboxMengenzuschlag ? mengenzuschlag : 0) +
    (checkboxADRZuschlag
      ? Number(gefahrgutzuschlag) + Number(energiezuschlag)
      : 0) -
    guthaben

  const bruttoGesamtpreis = nettoGesamtpreis * currentMwstFactor

  return {
    netto: `${nettoGesamtpreis.toFixed(2).replace('.', ',')}
       €`,
    brutto: `${bruttoGesamtpreis.toFixed(2).replace('.', ',')} €`,
  }
}
