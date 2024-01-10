import React, { useState } from 'react'

import Image from 'next/image'

import s from './Post.module.scss'

import { PostResponseType } from '@/shared/api'
import { findDate } from '@/shared/utils/findDate'

export const Post = (post: PostResponseType) => {
  const postCreatedAt = findDate.difference(post.createdAt)
  const [showMore, setShowMore] = useState(false)

  const text = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci at
  nulla reiciendis. Accusantium consequuntur dolor eius illum maiores quos. Aut dolor dolores
  error officia placeat sint, sunt ullam ut vel?`

  const truncatedText = showMore ? text : `${text.substring(0, 80)}..`

  return (
    <div className={s.post} key={post.id}>
      <Image src={post.images[0].url} width={234} height={240} alt="Picture of the post" />
      <div>
        <Image src={post.avatarOwner} width={23} height={24} alt={'Avatar picture'} />
        URLProfile
      </div>
      <div>{postCreatedAt}</div>
      {/*<div className={s.postDescription}>{post.description}</div>*/}
      <p>
        {showMore ? text : truncatedText}
        <span onClick={() => setShowMore(!showMore)} className={s.showMore}>
          {showMore && <br />} Show more
        </span>
      </p>
    </div>
  )
}
