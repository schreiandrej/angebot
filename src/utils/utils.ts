export const transformPreis = (preis: string) => {
  const replacedComma = preis.replace(',', '.')
  return parseFloat(replacedComma) < 1
    ? parseFloat(replacedComma)
    : parseFloat(replacedComma) / 100
}
