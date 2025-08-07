import {
  createBaseThemeOptions,
  createUnifiedTheme,
  palettes,
} from '@backstage/theme';

export const darkTheme = createUnifiedTheme({
  ...createBaseThemeOptions({
    palette: {
      ...palettes.dark,
      primary: { main: '#1E1E1E' },
      secondary: { main: '#D4D4D4' },
      background: { default: '#000000', paper: '#121212' },
      navigation: {
        background: '#121212',
        indicator: '#00ff96',
        color: '#D4D4D4',
        selectedColor: '#569CD6',
      },
    },
  }),
});