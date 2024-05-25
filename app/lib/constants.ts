export const currentMwstFactor = 1.19

export const mengezuschlagOptions = [
  { id: 1, name: 'Kein Mengenzuschlag', value: 0, unavailable: false },
  { id: 2, name: 'Teilmenge', value: 69, unavailable: false },
  { id: 3, name: 'Mindermenge', value: 195, unavailable: false },
]

export const tankvolumenOptions = [
  { id: 0, name: '1200 l', value: 1200, unavailable: false },
  { id: 1, name: '1775 l', value: 1775, unavailable: false },
  { id: 2, name: '2700 l', value: 2700, unavailable: false },
  { id: 3, name: '2750 l', value: 2750, unavailable: false },
  { id: 4, name: '4850 l', value: 4850, unavailable: false },
  { id: 5, name: '6400 l', value: 6400, unavailable: false },
  { id: 6, name: '6800 l', value: 6800, unavailable: false },
]

export const initialValues = {
  literpreis: null,
  liefermenge: null,
  füllstand: 0,
  tankvolumen: null,
  mengenzuschlag: 69.0,
  energiezuschlag: 6.5,
  gefahrgutzuschlag: 16.8,
  vorkasse: null,
  guthaben: null,
  gefahrgutzuschlag_checkbox: true,
  mengenzuschlag_checkbox: false,
}
