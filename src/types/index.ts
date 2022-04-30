export interface IForm {
  literpreis: number
  liefermenge: number
  füllstand: number | null
  tankvolumen: number
  mengenzuschlag: number
  dieselzuschlag: number
  adrzuschlag: number
  vorkasse: number | null
}

export interface IFormData {
  literpreis: string
  liefermenge: string
  füllstand: string
  dieselzuschlag: string
  adrzuschlag: string
  vorkasse: string
}

export interface IOptionsType {
  id: number
  name: string
  value: number
  unavailable: boolean
}
