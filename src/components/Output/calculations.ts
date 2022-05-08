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
    netto: `${
      // mengenzuschlag ? mengenzuschlag.toFixed(2).replace('.', ',') :
      0
    } €`,
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

export const calcDieselzuschlag = (dieselzuschlag: number | string) => {
  return {
    netto: `${Number(dieselzuschlag).toFixed(2).replace('.', ',')} €`,
    brutto: `${(Number(dieselzuschlag) * currentMwstFactor)
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
  dieselzuschlag: number | string
) => {
  return {
    netto: `${
      preis * lietermenge +
      mengenzuschlag +
      Number(gefahrgutzuschlag) +
      Number(dieselzuschlag).toFixed(2).replace('.', ',')
    }
       €`,
    brutto: `${(
      (preis * lietermenge +
        mengenzuschlag +
        Number(gefahrgutzuschlag) +
        Number(dieselzuschlag)) *
      currentMwstFactor
    )
      .toFixed(2)
      .replace('.', ',')} €`,
  }
}
