export interface IForm {
  literpreis: number
  litermenge: number
  füllstand: number
  tankvolumen: number
  mengenzuschlag: number
  dieselzuschlag: number
  adrzuschlag: number
}

export interface IFormData {
  literpreis: string
  litermenge: string
  füllstand: string
  tankvolumen: string
  dieselzuschlag: string
  adrzuschlag: string
}

export interface IOptionsType {
  id: number
  name: string
  value: number
  unavailable: boolean
}
