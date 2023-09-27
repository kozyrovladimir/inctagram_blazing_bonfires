// import { GetStaticProps } from 'next'
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// import { useTranslation } from 'react-i18next'

import { useRouter } from 'next/router'

// export const getStaticProps: GetStaticProps = async ({ locale }) => {
//   if (locale === undefined) throw new Error()

//   return {
//     props: {
//       ...(await serverSideTranslations(locale, 'common')),
//     },
//   }
// }

// const { t, i18n } = useTranslation('common', { keyPrefix: 'Auth' })

const router = useRouter()

export const AppErrors: IAppErrors = {
  UserNameValidationError: 'Only Latin letters, numbers and "_", "-".',
  EmailValidationError: 'Email must contain A-Z, a-z , @',
  PasswordValidationError:
    'Password must contain a-z, A-Z, 0-9 ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~',
  MinCharactrers1: 'Minimum 1 characters.',
  MinCharactrers2: 'Minimum 2 characters.',
  MinCharactrers6: 'Minimum 6 characters.',
  MaxCharactrers20: 'Maximum 20 characters.',
  MaxCharactrers30: 'Maximum 30 characters.',
  MaxCharactrers50: 'Maximum 50 characters.',
  MaxCharactrers200: 'Maximum 200 characters.',
  SrartLatterNotSpecial:
    'The field must start with a capital letter and not have special characters.',
  RequiredField: 'Required field.',
}

interface IAppErrors {
  UserNameValidationError: string
  PasswordValidationError: string
  EmailValidationError: string
  MinCharactrers1: string
  MinCharactrers2: string
  MinCharactrers6: string
  MaxCharactrers20: string
  MaxCharactrers30: string
  MaxCharactrers50: string
  MaxCharactrers200: string
  SrartLatterNotSpecial: string
  RequiredField: string
}
