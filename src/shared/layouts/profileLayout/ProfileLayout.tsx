import React, { PropsWithChildren } from 'react'

import { NextPage } from 'next'

import BaseLayout from '../baseLayout/BaseLayout'

const ProfileLayout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <BaseLayout>{children}</BaseLayout>
    </>
  )
}

export default ProfileLayout
