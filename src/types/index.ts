export interface IForm {
  liter: number
  literpreis: number
  zuschlag: number
  dieselzuschlag: number
  adr: number
  tankvolumen: number
  füllstand: number
}

export interface IData {
  preis: string
  liter: string
  adr: string
  füllstand: string
  tankvolumen: string
}

export interface IOptionsType {
  id: number
  name: string
  value: number
  unavailable: boolean
}
