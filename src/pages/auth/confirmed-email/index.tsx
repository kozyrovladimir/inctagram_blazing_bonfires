import React, { useTransition } from 'react'

import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'react-i18next'

import styles from './ConfirmedEmail.module.scss'

import broConfirmImage from '@/shared/assets/icons/login/broCongratulations.svg'
import { getLayout } from '@/shared/layouts/mainLayout/MainLayout'
import { Button, ButtonTheme } from '@/shared/ui/button/Button'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (locale === undefined) throw new Error()

  return {
    props: {
      ...(await serverSideTranslations(locale, 'common')),
    },
  }
}

const ConfirmedEmailPage = () => {
  const { t } = useTranslation('common', { keyPrefix: 'Auth' })

  return (
    <div className={styles.confirmedContainer}>
      <h3>{t('Congratulations')}</h3>
      <p>{t('EmailConfirmed')}</p>
      <Link href={'/sign-in'}>
        <Button theme={ButtonTheme.FILLED}>{t('SignIn')}</Button>
      </Link>
      <Image src={broConfirmImage} alt={'women login account in her phone'} />
    </div>
  )
}

ConfirmedEmailPage.getLayout = getLayout
export default ConfirmedEmailPage
