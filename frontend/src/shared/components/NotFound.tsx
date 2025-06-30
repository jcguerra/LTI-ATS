import { Box, Typography, Button, Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const NotFound = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="60vh"
        textAlign="center"
        gap={3}
      >
        <Typography variant="h1" component="h1" color="text.secondary">
          404
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom>
          {t('errors.not_found')}
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          La página que buscas no existe o ha sido movida.
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/dashboard')}
        >
          Volver al Dashboard
        </Button>
      </Box>
    </Container>
  )
}

export default NotFound 