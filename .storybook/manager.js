import { addons } from '@storybook/addons';
import { create } from '@storybook/theming/create';

const theme = create({
  base: 'light',
  brandTitle: 'Rocket Slate',
  brandUrl: 'https://github.com/rs-pro/rocket-slate'
});

addons.setConfig({
  theme,
  panelPosition: 'right',
});
