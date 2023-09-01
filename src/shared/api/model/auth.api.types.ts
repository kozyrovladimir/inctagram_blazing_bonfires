export type LoginFormType = {
  email: string
  password: string
}

export type LoginResponseType = {
  accessToken: string
}
export type LogoutResponse = {
  statusCode: string
  messages: [
    {
      message: string
      field: string
    },
  ]
  error: string | null
}

export type SignUpType = {
  userName: string
  email: string
  password: string
  passwordConfirmation: string
  agreement: boolean
}

export type UserType = {
  userId?: number
  userName: string
  email: string
  password: string
}

export type PasswordRecoveryType = {
  email: string
  recaptcha: string
}

export type NewPasswordType = {
  newPassword: string
  recoveryCode: string
}
export type ResendVerificationLinkType = {
  email: string
  baseUrl: string
}
