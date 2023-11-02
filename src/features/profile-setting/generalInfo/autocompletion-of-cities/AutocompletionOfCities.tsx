import React, { FormEvent, useState } from 'react'

import Autosuggest from 'react-autosuggest'

import { citiesRF } from '@/features/profile-setting/generalInfo/autocompletion-of-cities/Cities'
import theme from '@/shared/ui/input/Input.module.scss'

const cities = citiesRF.map(city => city.name)

type Props = {
  error?: string
  callbackValue?: (value: string) => void
}

export const AutocompletionOfCities = ({ error, callbackValue }: Props) => {
  const [value, setValue] = useState<string>('')
  const [suggestions, setSuggestions] = useState<string[]>([])

  const onChange = (_: FormEvent<HTMLElement>, { newValue }: Autosuggest.ChangeEvent) => {
    setValue(newValue)
    callbackValue && callbackValue(newValue)
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
