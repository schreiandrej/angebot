import { currentMwstFactor } from './variables'

export const calcPreisProLiter = (preisProLiter: number) => {
  return {
    netto: `${preisProLiter.toFixed(4).replace('.', ',')} €`,
    brutto: `${(preisProLiter * currentMwstFactor)
      .toFixed(4)
      .replace('.', ',')} €`,
  }
}

export const calcPreisGesamtmenge = (preisProLiter: number, liter: number) => {
  return {
    netto: `${(preisProLiter * liter).toFixed(2).replace('.', ',')} €`,
    brutto: `${(preisProLiter * liter * currentMwstFactor)
      .toFixed(2)
      .replace('.', ',')} €`,
  }
}

export const calcZuschlag = (mengenzuschlag: number) => {
  return {
    netto: `${mengenzuschlag.toFixed(2).replace('.', ',')} €`,
    brutto: `${(mengenzuschlag * currentMwstFactor)
      .toFixed(2)
      .replace('.', ',')} €`,
  }
}

export const calcADR = (adrzuschlag: number) => {
  return {
    netto: `${adrzuschlag.toFixed(2).replace('.', ',')} €`,
    brutto: `${(adrzuschlag * currentMwstFactor)
      .toFixed(2)
      .replace('.', ',')} €`,
  }
}

export const calcDieselzuschlag = (dieselzuschlag: number) => {
  return {
    netto: `${dieselzuschlag.toFixed(2).replace('.', ',')} €`,
    brutto: `${(dieselzuschlag * currentMwstFactor)
      .toFixed(2)
      .replace('.', ',')} €`,
  }
}

export const calcGesamtPreis = (
  preis: number,
  lietermenge: number,
  mengenzuschlag: number,
  adrzuschlag: number,
  dieselzuschlag: number
) => {
  return {
    netto: `${(
      preis * lietermenge +
      mengenzuschlag +
      adrzuschlag +
      dieselzuschlag
    )
      .toFixed(2)
      .replace('.', ',')} €`,
    brutto: `${(
      (preis * lietermenge + mengenzuschlag + adrzuschlag + dieselzuschlag) *
      currentMwstFactor
    )
      .toFixed(2)
      .replace('.', ',')} €`,
  }
}
