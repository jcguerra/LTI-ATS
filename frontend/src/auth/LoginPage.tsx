import { Box, Typography, TextField, Button, Stack } from '@mui/material'
import { useTranslation } from 'react-i18next'

const LoginPage = () => {
  const { t } = useTranslation()

  return (
    <Box>
      <Typography variant="h4" component="h1" textAlign="center" gutterBottom>
        {t('auth.login')}
      </Typography>
      <Stack spacing={3} component="form">
        <TextField
          fullWidth
          label={t('auth.email')}
          type="email"
          variant="outlined"
        />
        <TextField
          fullWidth
          label={t('auth.password')}
          type="password"
          variant="outlined"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
        >
          {t('auth.login')}
        </Button>
      </Stack>
    </Box>
  )
}

export default LoginPage
