import React from 'react'

import { render, screen, fireEvent } from '@testing-library/react'

import '@testing-library/jest-dom'
import { SignInForm } from './SignInForm'

describe('Sign In Form', () => {
  it('render form', () => {
    const { getByText } = render(<SignInForm />)
    const textInForm = getByText(/Don’t have an account?/i)
    const allImg = screen.getAllByRole('img')
    const allButton = screen.getAllByRole('button')
    const allInputText = screen.getAllByRole('textbox')
    const inputPass = screen.getByPlaceholderText(/enter password/i)

    expect(allImg).toHaveLength(3)
    expect(allButton).toHaveLength(2)
    expect(allInputText).toHaveLength(2)
    expect(inputPass).toBeInTheDocument()
    expect(textInForm).toBeInTheDocument()
  })
  it('input empty', () => {
    render(<SignInForm />)
    expect(screen.getByPlaceholderText('Enter email')).toBeEmptyDOMElement()
    expect(screen.getByPlaceholderText('Enter name')).toBeEmptyDOMElement()
    expect(screen.getByPlaceholderText('Enter password')).toBeEmptyDOMElement()
  })

  it('input changed', () => {
    render(<SignInForm />)

    const inputName = screen.getByPlaceholderText('Enter name')

    expect(inputName).toBeEmptyDOMElement()
    fireEvent.change(inputName, {
      target: { value: 'Peter Parker' },
    })
    expect(inputName).toHaveValue('Peter Parker')
  })
})
