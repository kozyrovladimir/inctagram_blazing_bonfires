import type { Preview } from '@storybook/react'

import { StyleDecorator } from "../src/shared/config/storybook/StyleDecorator/StyleDecorator";

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
    StyleDecorator
  ]
};

export default preview;
