// Listbox options types

export type OptionsType = {
  id: number
  name: string
  value: string
  unavailable: boolean
}

// Picture components types

export type Countries = {
  countries: {
    country: Country[]
  }
}

export type Country = {
  capital: string
  continentName: string
  countryCode: string
  countryName: string
  currencyCode: string
  population: string
}

// Update ISN price component

export type SplittedFormDataType = {
  price: {
    30: string
    31: string
    32: string
    33: string
    34: string
    35: string
    36: string
    37: string
    38: string
    39: string
    40: string
    41: string
    42: string
    43: string
    44: string
    45: string
    47: string
    49: string
    50: string
    51: string
    52: string
    57: string
    58: string
    59: string
  }
  date: string
}

export type UpdateDataFormType = {
  '30-34': string
  '35-39': string
  '40-45,47': string
  '46,48,49': string
  '50-52, 57-59': string
}
