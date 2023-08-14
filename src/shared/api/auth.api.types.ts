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
  userName: string
  email: string
  password: string
}

// когда забыл пароль и жмешь на ссылку forgot password
export type ForgotPasswordType = {
  email: string
  recaptcha: string
}
// когда по ссылке forgot password придумываешь новый пароль
export type CreateNewPasswordFormType = {
  password: string
  passwordConfirmation: string
}
// то, что оправляется на бэк, после создания нового пароля
export type RecoveryPasswordType = {
  newPassword: string
  recoveryCode: string
}
