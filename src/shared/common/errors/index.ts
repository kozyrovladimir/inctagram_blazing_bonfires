export const AppErrors: IAppErrors = {
  THIS_NAME_ALREADY_EXISTS: 'This name already exists.',
  THIS_EMAIL_ALREADY_EXISTS: 'This email already exists.',
  MIN_1_CHARACTERS: 'Minimum 1 characters.',
  MIN_2_CHARACTERS: 'Minimum 2 characters.',
  MIN_6_CHARACTERS: 'Minimum 6 characters.',
  MAX_30_CHARACTERS: 'Maximum 30 characters.',
  MAX_50_CHARACTERS: 'Maximum 50 characters.',
  MAX_200_CHARACTERS: 'Maximum 200 characters.',
  START_LATTER_WITHOUT_SPECIAL:
    'The field must start with a capital letter and not have special characters.',
  REQUIRED_FIELD: 'Required field.',
}

interface IAppErrors {
  THIS_NAME_ALREADY_EXISTS: string
  THIS_EMAIL_ALREADY_EXISTS: string
  MIN_1_CHARACTERS: string
  MIN_2_CHARACTERS: string
  MIN_6_CHARACTERS: string
  MAX_30_CHARACTERS: string
  MAX_50_CHARACTERS: string
  MAX_200_CHARACTERS: string
  START_LATTER_WITHOUT_SPECIAL: string
  REQUIRED_FIELD: string
}