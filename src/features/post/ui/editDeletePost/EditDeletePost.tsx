import React, { useState } from 'react'

import NextImage from 'next/image'

import styles from './EditDeletePost.module.scss'

import NewPostModal from '@/features/create-post/ui/newPostModal/NewPostModal'
import { DeletePost } from '@/features/post/ui/icons/DeletePost'
import { EditPost } from '@/features/post/ui/icons/EditPost'
import { useDeletePostMutation } from '@/shared/api/services/posts/posts.api'
import { PostsResponseType } from '@/shared/api/services/posts/posts.api.types'
import { ProfileUserType } from '@/shared/api/services/profile/profile.api.types'
import closeIcon from '@/shared/assets/icons/logout/close.svg'
import { Button, ButtonTheme } from '@/shared/ui/button/Button'

type Props = {
  postData: PostsResponseType | undefined
  setIsPostActive: (isPostActive: boolean) => void
  setOpenBtn: (openBtn: boolean) => void
  profileData: ProfileUserType | undefined
  setIsOpenEdit: (isOpenEdit: boolean) => void
}
export const EditDeletePost = ({ postData, setIsPostActive, setOpenBtn, setIsOpenEdit }: Props) => {
  const [deletePost] = useDeletePostMutation()
  const [isOpen, setIsOpen] = useState(false)
  const removePostHandler = () => {
    if (postData) {
      deletePost(postData.id)
        .unwrap()
        .then(() => setIsPostActive(false))
    }
  }

  const openDeleteModal = () => {
    setIsOpen(true)
  }

  const closeDeleteModal = () => {
    setIsOpen(false)
  }

  const openEditModal = () => {
    setIsOpenEdit(true)
    setOpenBtn(false)
  }

  return (
    <>
      <div className={styles.editDeleteButtonContainer}>
        <div className={styles.buttonsContainer}>
          <button className={styles.button} onClick={openEditModal}>
            <EditPost color={'#fff'} />
          </button>
          <button className={styles.button} onClick={openDeleteModal}>
            <DeletePost color={'#fff'} />
          </button>
        </div>
      </div>
      {isOpen && (
        <NewPostModal
          isOpen={isOpen}
          setIsOpen={() => setIsOpen(false)}
          title={'Delete Post'}
          right={
            <NextImage
              style={{ cursor: 'pointer' }}
              src={closeIcon}
              alt={''}
              onClick={closeDeleteModal}
            />
          }
        >
          <div className={styles.modalWrapper}>
            <div className={styles.textWrapper}>
              <p className={styles.text}>Are you sure want to delete this post?</p>
            </div>

            <div className={styles.buttonsContainer}>
              <Button
                theme={ButtonTheme.CLEAR}
                className={styles.button}
                onClick={removePostHandler}
              >
                Yes
              </Button>
              <Button className={styles.button} onClick={closeDeleteModal}>
                No
              </Button>
            </div>
          </div>
        </NewPostModal>
      )}
    </>
  )
}
