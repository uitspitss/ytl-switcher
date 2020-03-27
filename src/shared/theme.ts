import { createMuiTheme, Theme } from '@material-ui/core/styles';

// Create a theme instance.
const theme: Theme = createMuiTheme({
  palette: {
    primary: {
      light: '#4f5b62',
      main: '#263238',
      dark: '#000a12',
      contrastText: '#f5f5f5',
    },
    secondary: {
      light: '#fff176',
      main: '#ffffa8',
      dark: '#cabf45',
      contrastText: '#212121',
    },
  },
});

export default theme;
