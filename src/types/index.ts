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
  literpreis: string
  liefermenge: string
  füllstand: string
  mengenzuschlag: string
  dieselzuschlag: string
  gefahrgutzuschlag: string
  vorkasse: string
  guthaben: string
}

export interface IOptionsType {
  id: number
  name: string
  value: number
  unavailable: boolean
}
