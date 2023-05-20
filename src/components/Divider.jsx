import React from 'react';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
function CustomDivider() {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        mt: 2, mb: 2}}>
      <Divider sx={{backgroundColor: 'background.primary', width: '40%'}}/>
    </Container>
  );
}

export default CustomDivider;
