import type { Preview } from '@storybook/react'
import { ApiDecorator } from "../src/shared/config/storybook/ApiDecorator/ApiDecorator";
import { StyleDecorator } from "../src/shared/config/storybook/StyleDecorator/StyleDecorator";
import { ReduxStoreProviderDecorator } from '../src/app/providers/StoreProvider/index'

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
  decorators: [
    StyleDecorator,
    ApiDecorator,
    ReduxStoreProviderDecorator
  ]
};

export default preview;
