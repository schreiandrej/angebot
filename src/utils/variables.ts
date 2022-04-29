export const listOptions = [
  { id: 1, name: 'Kein Zuschlag', value: 0, unavailable: false },
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
  liter: 0,
  literpreis: 0,
  zuschlag: 0,
  dieselzuschlag: 0,
  adr: 0,
}
