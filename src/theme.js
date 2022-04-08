import { createTheme } from '@mui/material'

const theme = createTheme({
  palette: {
    primary: { main: '#523063' },
    secondary: { main: '#252E3F' },
    // website: { main: '#fafafa' },
    // error: { main: '#FF9516' },
    background: {
      default: '#fafafa',
      // card: '#212421',
    },
  },
  // typography: {
  //   fontFamily: ['Rubik', 'sans-serif'].join(','),
  //   h5: {
  //     lineHeight: '1.5',
  //   },
  //   h6: {
  //     lineHeight: '1.25',
  //   },
  // },
})

export default theme
