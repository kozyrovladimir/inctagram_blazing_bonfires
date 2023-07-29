import '../../../../styles/globals.scss'
import { ReactNode } from 'react'

export const StyleDecorator = (story: () => ReactNode): ReactNode => story()
