import React from 'react'
import { Typography, Container } from '@mui/material';


const ErrorPage = () => {
  return (
    <Container sx={{ textAlign: 'center', marginTop: '4rem' }}>
    <Typography variant="h3" gutterBottom>
      404 - Page Not Found
    </Typography>
    <Typography variant="body1">
      The page you're looking for doesn't exist or has been moved.
    </Typography>
  </Container>
  )
}

export default ErrorPage