export const getPostleitzahlArray = (preisliste) => {
  const plzArray = Object.keys(preisliste[0]).slice(0, -2)

  return plzArray
}
