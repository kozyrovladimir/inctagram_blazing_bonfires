export type PostImageType = {
  file: File
}

type Image = {
  url: string
  width: number
  height: number
  fileSize: number
  uploadId: string
}

export type PostsImageResponseType = {
  images: Image[]
}
