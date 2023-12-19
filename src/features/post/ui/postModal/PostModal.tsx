import React, { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { EditDeletePost } from '@/features/post/ui/editDeletePost/EditDeletePost'
import { PostImages } from '@/features/post/ui/postImagesModal/PostImages'
import styles from '@/features/post/ui/postModal/PostModal.module.scss'
import style from '@/pages/profile/profile.module.scss'
import { GetPostByIdResponseType } from '@/shared/api/services/posts/posts.api.types'
import noImage from '@/shared/assets/icons/avatarProfile/notPhoto.png'
import editDeleteButton from '@/shared/assets/icons/editDeletePost/editDeleteButton.svg'
import closeIcon from '@/shared/assets/icons/icons/closeIcon.svg'
import likeIcon from '@/shared/assets/icons/icons/likeIcon.svg'
import saveIcon from '@/shared/assets/icons/icons/saveIcon.svg'
import shareIcon from '@/shared/assets/icons/icons/shareIcon.svg'
import { RoutersPath } from '@/shared/constants/paths'
import { Button, ButtonTheme } from '@/shared/ui/button/Button'

type Props = {
  postData: GetPostByIdResponseType | undefined
  setIsPostActive: (isPostActive: boolean) => void
}
export const PostModal = ({ postData, setIsPostActive }: Props) => {
  const { profile, posts } = postData || {}
  const [openBtn, setOpenBtn] = useState(false)
  const handleButtonClick = () => {
    setOpenBtn(prevState => !prevState)
  }

  return (
    <div className={styles.postContainer}>
      <Link href={RoutersPath.profile}>
        <div className={styles.closeIconContainer}>
          <Image src={closeIcon} alt={''} onClick={() => setIsPostActive(false)} />
        </div>
      </Link>
      <div className={styles.post}>
        <div className={styles.postPhotoContainer}>
          <PostImages postData={postData} />
        </div>
        <div className={styles.descriptionContainer}>
          <div className={styles.headerContainer}>
            <div className={style.avatarContainer}>
              <Image
                src={noImage}
                alt={'avatar'}
                width={36}
                height={36}
                style={{ cursor: 'pointer' }}
              />
            </div>
            <p className={styles.userName}>{profile?.userName}</p>
            <Button
              theme={ButtonTheme.CLEAR}
              className={styles.editDeleteButton}
              onClick={handleButtonClick}
            >
              <Image src={editDeleteButton} alt={''} />
            </Button>
            {openBtn && <EditDeletePost posts={posts} setIsPostActive={setIsPostActive} />}
          </div>
          <div className={styles.commentsContainer}>
            <div className={styles.commentContainer}>
              <div className={style.avatarContainer}>
                <Image
                  src={noImage}
                  alt={'avatar'}
                  width={36}
                  height={36}
                  style={{ cursor: 'pointer' }}
                />
              </div>
              <div>
                <div className={styles.commentTextContainer}>
                  <p className={styles.commentText}>
                    <strong>husky </strong>
                    Lorem ipsum dolor sit amet, consectetur adipisicing. Lorem ipsum dolor sit amet,
                    consectetur adipisicing.
                  </p>
                  <div className={styles.commentLikeContainer}>
                    <Link href={'#'}>
                      <Image src={likeIcon} alt={''} />
                    </Link>
                  </div>
                </div>
                <div className={styles.commentInfoContainer}>
                  <p className={styles.commentTime}>2 Hours ago</p>
                  <p className={styles.commentLikes}>Likes: 12</p>
                  <p className={styles.commentLikes} style={{ cursor: 'pointer' }}>
                    Answer
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.commentContainer}>
              <div className={style.avatarContainer}>
                <Image
                  src={noImage}
                  alt={'avatar'}
                  width={36}
                  height={36}
                  style={{ cursor: 'pointer' }}
                />
              </div>
              <div>
                <div className={styles.commentTextContainer}>
                  <p className={styles.commentText}>
                    <strong>husky </strong>
                    Lorem ipsum dolor sit amet, consectetur adipisicing. Lorem ipsum dolor sit amet,
                    consectetur adipisicing.
                  </p>
                  <div className={styles.commentLikeContainer}>
                    <Link href={'#'}>
                      <Image src={likeIcon} alt={''} />
                    </Link>
                  </div>
                </div>
                <div className={styles.commentInfoContainer}>
                  <p className={styles.commentTime}>2 Hours ago</p>
                  <p className={styles.commentLikes}>Likes: 12</p>
                  <p className={styles.commentLikes} style={{ cursor: 'pointer' }}>
                    Answer
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.commentContainer}>
              <div className={style.avatarContainer}>
                <Image
                  src={noImage}
                  alt={'avatar'}
                  width={36}
                  height={36}
                  style={{ cursor: 'pointer' }}
                />
              </div>
              <div>
                <div className={styles.commentTextContainer}>
                  <p className={styles.commentText}>
                    <strong>husky </strong>
                    Lorem ipsum dolor sit amet, consectetur adipisicing. Lorem ipsum dolor sit amet,
                    consectetur adipisicing.
                  </p>
                  <div className={styles.commentLikeContainer}>
                    <Link href={'#'}>
                      <Image src={likeIcon} alt={''} />
                    </Link>
                  </div>
                </div>
                <div className={styles.commentInfoContainer}>
                  <p className={styles.commentTime}>2 Hours ago</p>
                  <p className={styles.commentLikes}>Likes: 12</p>
                  <p className={styles.commentLikes} style={{ cursor: 'pointer' }}>
                    Answer
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.commentContainer}>
              <div className={style.avatarContainer}>
                <Image
                  src={noImage}
                  alt={'avatar'}
                  width={36}
                  height={36}
                  style={{ cursor: 'pointer' }}
                />
              </div>
              <div>
                <div className={styles.commentTextContainer}>
                  <p className={styles.commentText}>
                    <strong>husky </strong>
                    Lorem ipsum dolor sit amet, consectetur adipisicing. Lorem ipsum dolor sit amet,
                    consectetur adipisicing.
                  </p>
                  <div className={styles.commentLikeContainer}>
                    <Link href={'#'}>
                      <Image src={likeIcon} alt={''} />
                    </Link>
                  </div>
                </div>
                <div className={styles.commentInfoContainer}>
                  <p className={styles.commentTime}>2 Hours ago</p>
                  <p className={styles.commentLikes}>Likes: 12</p>
                  <p className={styles.commentLikes} style={{ cursor: 'pointer' }}>
                    Answer
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.commentContainer}>
              <div className={style.avatarContainer}>
                <Image
                  src={noImage}
                  alt={'avatar'}
                  width={36}
                  height={36}
                  style={{ cursor: 'pointer' }}
                />
              </div>
              <div>
                <div className={styles.commentTextContainer}>
                  <p className={styles.commentText}>
                    <strong>husky </strong>
                    Lorem ipsum dolor sit amet, consectetur adipisicing. Lorem ipsum dolor sit amet,
                    consectetur adipisicing.
                  </p>
                  <div className={styles.commentLikeContainer}>
                    <Link href={'#'}>
                      <Image src={likeIcon} alt={''} />
                    </Link>
                  </div>
                </div>
                <div className={styles.commentInfoContainer}>
                  <p className={styles.commentTime}>2 Hours ago</p>
                  <p className={styles.commentLikes}>Likes: 12</p>
                  <p className={styles.commentLikes} style={{ cursor: 'pointer' }}>
                    Answer
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.commentContainer}>
              <div className={style.avatarContainer}>
                <Image
                  src={noImage}
                  alt={'avatar'}
                  width={36}
                  height={36}
                  style={{ cursor: 'pointer' }}
                />
              </div>
              <div>
                <div className={styles.commentTextContainer}>
                  <p className={styles.commentText}>
                    <strong>husky </strong>
                    Lorem ipsum dolor sit amet, consectetur adipisicing. Lorem ipsum dolor sit amet,
                    consectetur adipisicing.
                  </p>
                  <div className={styles.commentLikeContainer}>
                    <Link href={'#'}>
                      <Image src={likeIcon} alt={''} />
                    </Link>
                  </div>
                </div>
                <div className={styles.commentInfoContainer}>
                  <p className={styles.commentTime}>2 Hours ago</p>
                  <p className={styles.commentLikes}>Likes: 12</p>
                  <p className={styles.commentLikes} style={{ cursor: 'pointer' }}>
                    Answer
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.summaryContainer}>
            <div className={styles.actionsContainer}>
              <div className={styles.likeShareContainer}>
                <Image
                  src={likeIcon}
                  width={24}
                  height={24}
                  style={{ cursor: 'pointer' }}
                  alt={''}
                />
                <Image
                  src={shareIcon}
                  width={24}
                  height={24}
                  style={{ cursor: 'pointer' }}
                  alt={''}
                />
              </div>
              <div>
                <Image
                  src={saveIcon}
                  width={24}
                  height={24}
                  style={{ cursor: 'pointer' }}
                  alt={''}
                />
              </div>
            </div>
            <div className={styles.totalLikes}>
              <div className={style.avatarContainer}>
                <Image src={noImage} alt={'avatar'} width={36} height={36} />
              </div>
              <p className={styles.totalLikesCount}>2435 Likes</p>
            </div>
            <div className={styles.postDate}>July 3, 2021</div>
          </div>
          <div className={styles.addCommentContainer}>
            <form className={styles.addCommentForm}>
              <input
                className={styles.addCommentInput}
                placeholder={'Add a Comment...'}
                type="text"
              />
              <button className={styles.addCommentButton}>Publish</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
