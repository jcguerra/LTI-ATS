import { Typography, Container } from '@mui/material'
import { useTranslation } from 'react-i18next'

const CandidatesListPage = () => {
  const { t } = useTranslation()
  
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {t('candidates.title')}
      </Typography>
    </Container>
  )
}

export default CandidatesListPage
