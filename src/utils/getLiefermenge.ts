export const getLiefermenge = (
  literpreis: number,
  liefermenge: number | null,
  füllstand: number | null,
  mengenzuschlag: number,
  dieselzuschlag: number,
  gefahrgutzuschlag: number,
  vorkasse: number | null,
  guthaben: number,
  tankvolumen: number,
  currentMwstFactor: number
) => {
  if (vorkasse !== null) {
    return Number(
      Math.floor(
        (Number(vorkasse) +
          guthaben -
          (dieselzuschlag + gefahrgutzuschlag + mengenzuschlag) *
            currentMwstFactor) /
          currentMwstFactor /
          (literpreis / 100)
      )
    )
  } else if (liefermenge === null && füllstand !== null) {
    return Math.floor(tankvolumen * ((85 - Number(füllstand)) / 100))
  }

  return Number(liefermenge)
}
