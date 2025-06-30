import { Typography, Container } from '@mui/material'
import { useTranslation } from 'react-i18next'

const DashboardPage = () => {
  const { t } = useTranslation()
  
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {t('navigation.dashboard')}
      </Typography>
      <Typography variant="body1">
        {t('dashboard.welcome')}
      </Typography>
    </Container>
  )
}

export default DashboardPage
