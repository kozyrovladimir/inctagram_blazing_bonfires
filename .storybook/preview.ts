import type { Preview } from '@storybook/react'
import { ApiDecorator } from '@/shared/config/storybook/apiDecorator/ApiDecorator'
import { StyleDecorator } from '@/shared/config/storybook/styleDecorator/StyleDecorator'
import { StoreDecorator } from '@/shared/providers/storeProvider/index'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [StyleDecorator, ApiDecorator, StoreDecorator],
}

export default preview
