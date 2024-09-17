// theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FBC02D',
    },
    secondary: {
      main: '#FFFDE7',
    },
    background: {
      default: '#FFF9C4',
    },
    
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

export default theme;