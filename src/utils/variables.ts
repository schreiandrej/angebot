export const currentMwstFactor = 1.19

export const mengezuschlagOptions = [
  { id: 1, name: 'Kein Mengenzuschlag', value: 0, unavailable: false },
  { id: 1, name: 'Teilmenge', value: 49, unavailable: false },
  { id: 1, name: 'Mindermenge', value: 165, unavailable: false },
]

export const tankvolumenOptions = [
  { id: 1, name: '1775 Liter', value: 1775, unavailable: false },
  { id: 1, name: '2700 Liter', value: 2700, unavailable: false },
  { id: 1, name: '4850 Liter', value: 4850, unavailable: false },
  { id: 1, name: '6400 Liter', value: 6400, unavailable: false },
]

export const initialFormState = {
  literpreis: 0,
  liefermenge: 0,
  füllstand: null,
  tankvolumen: 0,
  mengenzuschlag: 0,
  dieselzuschlag: 0,
  adrzuschlag: 0,
  vorkasse: null,
}
