import React from 'react';
import Grid from '@mui/material/Grid';
import HeroTable from './HeroTable';
import Container from '@mui/material/Container';

export default function Main() {
  return (
    <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', mt: 3}}>
      <HeroTable/>
    </Container>
  );
}
