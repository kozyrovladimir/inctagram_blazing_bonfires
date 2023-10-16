import React, { FC, FormEvent, useState } from 'react'

import Autosuggest from 'react-autosuggest'

import theme from '../../../../shared/ui/Input/Input.module.scss'

import { citiesRF } from '@/features/profile-setting/GeneralInfo/Autocompletion_of_cities/cities'

const cities = citiesRF.map(city => city.name)

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
