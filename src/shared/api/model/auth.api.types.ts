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
}

export type UserType = {
  userName: string
  email: string
  password: string
}

export type ResendVerificationLinkType = {
  email: string
  baseUrl: string
}
