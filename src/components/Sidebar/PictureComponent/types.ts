// Picture components types

export interface Countries {
  countries: {
    country: Country[]
  }
}

export interface CountryCapital {
  capital: string
}

export interface CountryInformation {
  continentName?: string
  countryCode?: string
  countryName?: string
  currencyCode?: string
  population?: string
}

export interface Country extends CountryCapital, CountryInformation {}
