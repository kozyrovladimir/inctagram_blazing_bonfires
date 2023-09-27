import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (locale === undefined) throw new Error()

  return {
    props: {
      ...(await serverSideTranslations(locale, 'common')),
    },
  }
}
export { CreateNewPassForm } from './ui/CreateNewPassForm/CreateNewPassForm'
export { SignInForm } from './ui/SignInForm/SignInForm'
export { SignUpForm } from './ui/SignUpForm/SignUpForm'
export { ForgotPass } from './ui/ForgotPassForm/ForgotPassForm'
