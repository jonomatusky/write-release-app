import { createTheme } from '@mui/material'

const theme = createTheme({
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 16,
      },
    },
  },
  shape: {
    borderRadius: 8,
  },
  palette: {
    primary: { main: '#673C7C' },
    secondary: { main: '#657BA4' },
    // website: { main: '#fafafa' },
    // error: { main: '#FF9516' },
    background: {
      // default: '#fafafa',
      // card: '#212421',
    },
  },
  typography: {
    fontFamily: ['Work Sans', 'sans-serif'].join(','),
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
})

export default theme
