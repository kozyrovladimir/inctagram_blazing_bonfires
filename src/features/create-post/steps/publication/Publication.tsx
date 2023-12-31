import React, { ChangeEvent, useState } from 'react'

import Image from 'next/image'
import { toast, Toaster } from 'react-hot-toast'
import { useWizard } from 'react-use-wizard'

import style from './Publication.module.scss'

import { useImageCropContext } from '@/features/create-post/context/CropProvider'
import { ImagePublication } from '@/features/create-post/steps/imagePablication/ImagePublication'
import { SavedImage } from '@/features/create-post/steps/savedImage/SavedImage'
import NewPostModal from '@/features/create-post/ui/newPostModal/NewPostModal'
import { useGetProfileQuery, useMeQuery } from '@/shared/api'
import {
  useCreatePostMutation,
  useUploadImageMutation,
} from '@/shared/api/services/posts/posts.api'
import { ImageDataType } from '@/shared/api/services/posts/posts.api.types'
import backIcon from '@/shared/assets/icons/arrow back/back.svg'
import { Input, InputType } from '@/shared/ui/input/Input'
import { LinearLoader } from '@/shared/ui/loaders/LinearLoader'

export const Publication = () => {
  const { isOpen, setIsOpen } = useImageCropContext()
  const [text, setText] = useState<string>('')
  const { previousStep } = useWizard()
  const cropContext = useImageCropContext()

  const { data } = useMeQuery()
  const { data: profileData } = useGetProfileQuery(data?.userId ? data?.userId.toString() : '')
  const [uploadImage, { isLoading: isUploadLoading }] = useUploadImageMutation()
  const [createPost, { isLoading: isCreatePostLoading }] = useCreatePostMutation()
  const savedImagesString = localStorage.getItem('uploadedImages')
  const savedImages: ImageDataType[] = savedImagesString ? JSON.parse(savedImagesString) : null

  // const avatar = profileData?.avatars[1].url
  // const avatar= 'sss'
  const isLoading = isUploadLoading || isCreatePostLoading

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value)
  }

  const handlePublish = async () => {
    const formData = new FormData()

    // преобразование url всех изображений в file
    for (const photo of cropContext.photos) {
      const result = await fetch(photo.url)
      const blob = await result.blob()
      const file = new File([blob], 'image', { type: 'image/jpg' })

      // Добавление file в FormData
      formData.append('file', file)
    }

    uploadImage(formData)
      .unwrap()
      .then(res => {
        const uploadIds = res.images.map(image => image.uploadId)

        const body = {
          description: text,
          childrenMetadata: uploadIds.map(uploadId => ({ uploadId })),
        }

        createPost(body)
          .unwrap()
          .then(() => {
            toast.success('Post Created')
            setIsOpen(!isOpen)
          })
          .catch(error => {
            toast.error(error.data.messages[0].message)
          })
      })
      .catch(error => {
        toast.error(error.data.messages)
      })
  }
  const handleSavedImagePublish = () => {
    const uploadIds = savedImages.map(image => image.uploadId)
    const body = {
      description: text,
      childrenMetadata: uploadIds.map(uploadId => ({ uploadId })),
    }

    createPost(body)
      .unwrap()
      .then(() => {
        toast.success('Post Created')
        setIsOpen(!isOpen)
      })
      .catch(error => {
        toast.error(error.data.messages[0].message)
      })
  }

  return (
    <>
      <Toaster position={'bottom-center'} />
      {isLoading && <LinearLoader />}
      <NewPostModal
        isOpen={isOpen}
        title={'Publication'}
        setIsOpen={setIsOpen}
        left={
          <Image style={{ cursor: 'pointer' }} src={backIcon} alt={''} onClick={previousStep} />
        }
        right={
          <span
            style={{ cursor: 'pointer' }}
            onClick={savedImages ? handleSavedImagePublish : handlePublish}
          >
            Publish
          </span>
        }
      >
        <div className={style.publishModalContent}>
          <div className={style.sliderWrapper}>
            {savedImages ? (
              <>
                <SavedImage savedImages={savedImages} />
              </>
            ) : (
              <ImagePublication cropContext={cropContext} />
            )}
          </div>
          <div className={style.publish}>
            <div className={style.publishContent}>
              <div className={style.avatarWrapper}>
                {backIcon && (
                  <Image
                    src={backIcon}
                    alt="userPhoto"
                    className={style.avatar}
                    width={45}
                    height={45}
                  />
                )}
                <div className={style.userName}>{profileData?.userName}</div>
              </div>
              <div className={style.description}>
                <label className={style.label}>Add publication descriptions</label>
                <textarea
                  rows={6}
                  cols={60}
                  value={text}
                  maxLength={500}
                  onChange={handleChange}
                  style={{ backgroundColor: 'black', width: '100%' }}
                />
                <div className={style.maxLength}> {text.length}/500</div>
                <Input
                  label={'Add location'}
                  placeholder={''}
                  type={InputType.LOCATION}
                  style={{ marginBottom: '20px' }}
                  classNameWrap={'myCustomLabel'}
                />
              </div>
            </div>
          </div>
        </div>
      </NewPostModal>
    </>
  )
}
