export type ProfileUserType = {
  id?: number
  userName: string
  email?: string
  password?: string
  firstName?: string
  lastName?: string
  city?: string
  dateOfBirth?: Date
  aboutMe?: string
  avatars: AvatarsType
}

export type AvatarsType = {
  url?: string
  width: number
  height: number
  fileSize: number
}[]

export type BaseUserType = {
  userId: number
  userName: string
  email: string
}
