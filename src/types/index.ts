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
}

export interface IFormData {
  literpreis: number
  liefermenge: number | string
  füllstand: number | string
  mengenzuschlag: number
  dieselzuschlag: number
  gefahrgutzuschlag: number
  vorkasse: number | string
  guthaben: number
}

export interface IOptionsType {
  id: number
  name: string
  value: number
  unavailable: boolean
}
