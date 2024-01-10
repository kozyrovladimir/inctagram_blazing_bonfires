import s from './ContentWrapper.module.scss'

export const ContentWrapper = ({ children }: any) => {
  return <div className={s.contentWrapper}>{children}</div>
}
