import React from 'react'

import styles from './EditDeletePost.module.scss'

import { DeletePost } from '@/features/post/ui/icons/DeletePost'
import { EditPost } from '@/features/post/ui/icons/EditPost'
import { useDeletePostMutation } from '@/shared/api/services/posts/posts.api'
import { PostsResponseType } from '@/shared/api/services/posts/posts.api.types'

type Props = {
  posts: PostsResponseType | undefined
  setIsPostActive: (isPostActive: boolean) => void
}
export const EditDeletePost = ({ posts, setIsPostActive }: Props) => {
  const [deletePost] = useDeletePostMutation()
  const removePostHandler = () => {
    if (posts) {
      deletePost(posts.id)
        .unwrap()
        .then(() => setIsPostActive(false))
    }
  }

  return (
    <div className={styles.editDeleteButtonContainer}>
      <div className={styles.buttonsContainer}>
        <button className={styles.button} onClick={() => {}}>
          <EditPost color={'#fff'} />
        </button>
        <button className={styles.button} onClick={removePostHandler}>
          <DeletePost color={'#fff'} />
        </button>
      </div>
    </div>
  )
}
