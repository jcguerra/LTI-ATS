import { Outlet } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { HelmetProvider } from 'react-helmet-async'
import { useAppSelector } from '../hooks/redux'
import { getTheme } from '../theme'

const RootLayout = () => {
  const { theme, language } = useAppSelector(state => state.ui)
  const currentTheme = getTheme(theme, language)

  return (
    <HelmetProvider>
      <ThemeProvider theme={currentTheme}>
        <CssBaseline />
        <Outlet />
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default RootLayout
