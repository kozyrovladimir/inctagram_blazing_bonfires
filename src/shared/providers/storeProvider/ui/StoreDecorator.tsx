import React from 'react'

import { StoreProvider } from './StoreProvider'

export const StoreDecorator = (storyFn: () => React.ReactNode) => {
  return <StoreProvider>{storyFn()}</StoreProvider>
}
