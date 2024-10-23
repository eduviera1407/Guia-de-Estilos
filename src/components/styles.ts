
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF0000', 
    },
    secondary: {
      main: '#FF4081',
    },
    background: {
      default: '#FFFFFF',
    },
    text: {
      primary: '#000000',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: {
      fontSize: '2rem',
    },
    h2: {
      fontSize: '1.5rem',
    },
    body1: {
      fontSize: '1rem',
    },
  },
});

export default theme;
