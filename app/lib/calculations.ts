import { currentMwstFactor } from '@/lib/constants'

const formatCurrency = (
  value: number,
  decimal_place_min: number = 2,
  decimal_place_max: number = 2
) =>
  new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: decimal_place_min,
    maximumFractionDigits: decimal_place_max,
  }).format(value)

export const calcPreisProLiter = (preisProLiter: number | null) => {
  return {
    netto: formatCurrency(preisProLiter || 0, 4, 4),
    brutto: formatCurrency(
      preisProLiter ? preisProLiter * currentMwstFactor : 0,
      4,
      4
    ),
  }
}

export const calcPreisGesamtmenge = (
  preisProLiter: number | null,
  liefermenge: number | null
) => {
  return {
    netto: formatCurrency((preisProLiter || 0) * (liefermenge || 0)),
    brutto: formatCurrency(
      (preisProLiter || 0) * (liefermenge || 0) * currentMwstFactor
    ),
  }
}

export const calcMengenzuschlag = (mengenzuschlag: number) => {
  return {
    netto: formatCurrency(mengenzuschlag),
    brutto: formatCurrency(mengenzuschlag * currentMwstFactor),
  }
}

export const calcGefahrgutzuschlag = (gefahrgutzuschlag: number | string) => {
  return {
    netto: formatCurrency(Number(gefahrgutzuschlag)),
    brutto: formatCurrency(Number(gefahrgutzuschlag) * currentMwstFactor),
  }
}

export const calcEnergiezuschlag = (energiezuschlag: number | string) => {
  return {
    netto: formatCurrency(Number(energiezuschlag)),
    brutto: formatCurrency(Number(energiezuschlag) * currentMwstFactor),
  }
}

export const calcGuthaben = (guthaben: number | null) => {
  return formatCurrency(guthaben || 0)
}

export const calcGesamtPreis = (
  preis: number | null,
  litermenge: number | null,
  mengenzuschlag: number,
  gefahrgutzuschlag: number | null,
  energiezuschlag: number | null,
  guthaben: number | null,
  checkboxADRZuschlag: boolean,
  checkboxMengenzuschlag: boolean
) => {
  const nettoGesamtpreis =
    (preis || 0) * (litermenge || 0) +
    (checkboxMengenzuschlag ? mengenzuschlag : 0) +
    (checkboxADRZuschlag
      ? Number(gefahrgutzuschlag) + Number(energiezuschlag)
      : 0) -
    (guthaben || 0)

  const bruttoGesamtpreis = nettoGesamtpreis * currentMwstFactor

  return {
    netto: formatCurrency(nettoGesamtpreis),
    brutto: formatCurrency(bruttoGesamtpreis),
  }
}
