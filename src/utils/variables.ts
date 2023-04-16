export const currentMwstFactor = 1.07

export const mengezuschlagOptions = [
  { id: 1, name: 'Kein Mengenzuschlag', value: 0, unavailable: false },
  { id: 2, name: 'Teilmenge', value: 69, unavailable: false },
  { id: 3, name: 'Mindermenge', value: 195, unavailable: false },
]

export const tankvolumenOptions = [
  { id: 1, name: '1200 l', value: 1200, unavailable: false },
  { id: 1, name: '1775 l', value: 1775, unavailable: false },
  { id: 2, name: '2700 l', value: 2700, unavailable: false },
  { id: 2, name: '2750 l', value: 2750, unavailable: false },
  { id: 3, name: '4850 l', value: 4850, unavailable: false },
  { id: 4, name: '6400 l', value: 6400, unavailable: false },
  { id: 4, name: '6800 l', value: 6800, unavailable: false },
]

export const initialFormState = {
  literpreis: 0,
  liefermenge: null,
  füllstand: null,
  tankvolumen: 0,
  mengenzuschlag: 69.0,
  dieselzuschlag: 4.2,
  gefahrgutzuschlag: 11,
  vorkasse: null,
  guthaben: 0,
  checkboxADRZuschlag: true,
  checkboxMengenzuschlag: false,
}
