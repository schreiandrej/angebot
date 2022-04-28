export interface IForm {
  liter: number
  literpreis: number
  zuschlag: number
  adr: number
}

export interface IData {
  preis: string
  liter: string
  adr: string
}

export interface IOptionsType {
  id: number
  name: string
  value: number
  unavailable: boolean
}
