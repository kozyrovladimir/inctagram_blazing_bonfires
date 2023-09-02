export type ProfileUserType = {
  id?: number
  userName: string
  email?: string
  password?: string
  firstName?: string
  lastName?: string
  city?: string
  dateOfBirth?: string
  aboutMe?: string
  avatars?: [
    {
      url?: string
      width: number
      height: number
      fileSize: number
    },
  ]
}

export type BaseUserType = {
  userId: number
  userName: string
  email: string
}
