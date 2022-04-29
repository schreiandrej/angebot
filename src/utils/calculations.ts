const currentMwstFactor = 0.19 * 100

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

export const calcZuschlag = (zuschlag: number) => {
  return {
    netto: `${zuschlag.toFixed(2).replace('.', ',')} €`,
    brutto: `${(zuschlag * currentMwstFactor).toFixed(2).replace('.', ',')} €`,
  }
}

export const calcADR = (adr: number) => {
  return {
    netto: `${adr.toFixed(2).replace('.', ',')} €`,
    brutto: `${(adr * currentMwstFactor).toFixed(2).replace('.', ',')} €`,
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

export const calcGesamtPreis = (preis: number) => {
  return {
    netto: `${(preis / currentMwstFactor).toFixed(2).replace('.', ',')} €`,
    brutto: `${preis.toFixed(2).replace('.', ',')} €`,
  }
}
