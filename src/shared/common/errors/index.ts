export const AppErrors = {
  THIS_NAME_ALREADY_EXISTS: 'This name already exists.',
  THIS_EMAIL_ALREADY_EXISTS: 'This email already exists.',
  MIN_2_CHARACTERS: 'Minimum 2 characters.',
  MAX_20_CHARACTERS: 'Maximum 20 characters.',
  START_LATTER_WITHOUT_SPECIAL:
    'The name must start with a letter and not have special characters.',
  REQUIRED_FIELD: 'Required field.',
}

interface IAppErrors {
  THIS_NAME_ALREADY_EXISTS: string
  THIS_EMAIL_ALREADY_EXISTS: string
  MIN_2_SIMBOLS: string
  MAX_20_CHARACTERS: string
  START_LATTER_WITHOUT_SPECIAL: string
  REQUIRED_FIELD: string
}
