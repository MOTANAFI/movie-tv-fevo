import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: '#212121', color: '#fff', py: 4, width: '100%' }}>
      <Container maxWidth="lg"  style={{marginTop: '3rem'}}>
      <Typography variant="body1" align="center" sx={{ mb: 2, color: 'gold' }}>
      <Link href='/'>Movie-Watch</Link>
        </Typography>
        
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
        <Typography variant="body2" align="center" sx={{ mb: 2 }}>
          &copy; {new Date().getFullYear()} All rights reserved.
        </Typography>
        <Typography variant="body2" align="center">
          Developed by{' '}
          <Link href="https://www.linkedin.com/in/mohamed-taha-0a8b31177/" target="_blank" rel="noopener"
          sx={{
            color: 'gold'
          }}
          >
            MOHAMED NASSIR
          </Link>
        </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;