import React from 'react'

import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import '@testing-library/jest-dom'
import { Input, InputType } from './Input'

describe('input component', () => {
  const onChange = jest.fn()

  it('render input', () => {
    const { getByPlaceholderText } = render(
      <Input label="" value="" placeholder="enter text" callback={onChange} type={InputType.TEXT} />
    )

    expect(getByPlaceholderText('enter text')).toBeInTheDocument()
  })

  it('input start - empty, changed - fill', async () => {
    render(
      <Input label="" value="" placeholder="enter text" callback={onChange} type={InputType.TEXT} />
    )
    const input = screen.getByRole('textbox')
    // const input = screen.getByPlaceholderText('enter text')

    expect(input).toBeEmptyDOMElement()
    await userEvent.type(input, 'peter.parker@gmail.com')
    expect(onChange).toHaveBeenCalledTimes(22)
  })
  it('input have classes', () => {
    render(
      <Input
        label="My label"
        value=""
        placeholder="enter text"
        callback={onChange}
        type={InputType.SEARCH}
      />
    )
    const label = screen.getByText('My label')
    const input = screen.getByRole('textbox')

    expect(input).toHaveClass('input')
    expect(input).toHaveClass('search')
    expect(label).toHaveClass('label')
  })
})
