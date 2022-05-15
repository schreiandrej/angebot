export const transformPreis = (literpreis: number | string) => {
  const dezimalPreis =
    Number(literpreis) > 5 ? Number(literpreis) / 100 : Number(literpreis)

  return dezimalPreis.toFixed(4).replace(',', '.')
}
