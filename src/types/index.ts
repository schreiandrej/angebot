export interface IForm {
  literpreis: number
  liefermenge: number | null
  füllstand: number | null
  tankvolumen: number
  mengenzuschlag: number
  dieselzuschlag: number
  gefahrgutzuschlag: number
  vorkasse: number | null
  guthaben: number
  checkboxADRZuschlag: boolean
  checkboxMengenzuschlag: boolean
}

export interface IOutput {
  literpreis: number
  liefermenge: number
  füllstand: number
  tankvolumen: number
  mengenzuschlag: number
  dieselzuschlag: number
  gefahrgutzuschlag: number
  vorkasse: number
  guthaben: number
  checkboxADRZuschlag: boolean
  checkboxMengenzuschlag: boolean
}

export interface IOptionsType {
  id: number
  name: string
  value: number
  unavailable: boolean
}
