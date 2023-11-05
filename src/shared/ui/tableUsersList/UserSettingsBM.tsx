import Image from 'next/image'
import style from './UserSettingsBM.module.scss'
import burgerMenuImg from '../../assets/icons/table/burger-menu.svg'
import deleteUserImg from '../../assets/icons/table/delete-user.svg'
import banUserImg from '../../assets/icons/table/ban-user.svg'
import { useEffect, useRef, useState } from 'react'

export const UserSettingsBM = () => {
  const [isOpenUserSettings, setIsOpenUserSettings] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  const userSettingsHandler = () => {
    setIsOpenUserSettings(!isOpenUserSettings)
  }

  const closeOpenMenu = (e: DocumentEventMap['mousedown']) => {
    if (ref.current && isOpenUserSettings && !ref.current!.contains(e.target as HTMLDivElement)) {
      setIsOpenUserSettings(false)
    }
  }

  useEffect(() => {
    if (isOpenUserSettings) {
      document.addEventListener('mousedown', closeOpenMenu)
    }

    return () => {
      document.removeEventListener('mousedown', closeOpenMenu)
    }
  }, [isOpenUserSettings])

  return (
    <div className={style.root} ref={ref}>
      <div className={style.mainButton} onClick={userSettingsHandler}>
        <Image src={burgerMenuImg} alt="" />
      </div>
      {isOpenUserSettings && (
        <div className={style.menuBlock}>
          <div className={style.menuItem}>
            <Image src={deleteUserImg} alt="" className={style.itemImg} />
            Delete User
          </div>
          <div className={style.menuItem}>
            <Image src={banUserImg} alt="" className={style.itemImg} />
            Ban in the system
          </div>
          <div className={style.menuItem}>
            <Image src={burgerMenuImg} alt="" className={style.itemImg} />
            More Information
          </div>
        </div>
      )}
    </div>
  )
}
