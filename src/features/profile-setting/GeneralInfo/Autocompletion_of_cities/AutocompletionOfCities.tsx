import React, { FC, FormEvent, useState } from 'react'

import Autosuggest from 'react-autosuggest'

import theme from '../../../../shared/ui/Input/Input.module.scss'

import { citiesBelarus } from '@/features/profile-setting/GeneralInfo/Autocompletion_of_cities/citiesBelarus'
import { citiesRF } from '@/features/profile-setting/GeneralInfo/Autocompletion_of_cities/citiesRF'

let cities = citiesRF.map(city => city.name)

// .push(citiesBelarus.map(city => city.cities.map(c => c.name)))
const citiesB = citiesBelarus.map(city => city.cities.map(c => c.name))

let mergedCitiesBelarus: string[] = []

citiesB.forEach(e => mergedCitiesBelarus.push(...e))

cities.push(...mergedCitiesBelarus)

type Props = {
  error?: string
}

export const AutocompletionOfCities: FC<Props> = ({ error }) => {
  const [value, setValue] = useState<string>('')
  const [suggestions, setSuggestions] = useState<string[]>([])

  const onChange = (_: FormEvent<HTMLElement>, { newValue }: Autosuggest.ChangeEvent) => {
    setValue(newValue)
  }

  const onSuggestionsFetchRequested = ({ value }: Autosuggest.SuggestionsFetchRequestedParams) => {
    const inputValue = value.trim().toLowerCase()
    const inputLength = inputValue.length

    setSuggestions(
      inputLength === 0
        ? []
        : cities.filter(city => city.toLowerCase().slice(0, inputLength) === inputValue)
    )
  }

  const onSuggestionsClearRequested = () => {
    setSuggestions([])
  }

  const getSuggestionValue = (suggestion: string) => suggestion
  const renderSuggestion = (suggestion: string) => <div>{suggestion}</div>

  const inputProps = {
    placeholder: '',
    value,
    onChange,
  }

  return (
    <>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        theme={theme}
      />
      {error && <p className={theme.error}>{error}</p>}
    </>
  )
}
