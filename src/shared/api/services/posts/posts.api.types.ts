export type PostsResponseType = {
  id: number
  description: string
  location: string
  images: {
    url: string
    width: number
    height: number
    fileSize: number
    uploadId: string
  }[]
  createdAt: string
  updatedAt: string
  ownerId: number
}
export type PostsType = {
  description: string
  childrenMetadata: {
    uploadId: string
  }[]
}
export type ImageDataType = {
  url: string
  width: number
  height: number
  fileSize: number
  uploadId: string
}

export type ImagesResponse = {
  images: ImageDataType[]
}
