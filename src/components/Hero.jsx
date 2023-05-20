import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import '../css/RainbowText.css';
export default function Hero() {
  return (
    <Box
      sx={{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <Typography
        variant="h2"
        component="div"
        sx={{mb: 4, fontWeight: 700}}>
        Smells like it&apos;s&nbsp;
        <Typography
          variant="h2"
          component="span"
          sx={{fontWeight: 700}}
          className="waveText">
            🔥burning Vita Inu🔥&nbsp;
        </Typography>
          today
      </Typography>
      <Typography
        variant="h5"
        component="span"
        sx={{mb: 4, fontWeight: 700}}>
            Discover the latest $VINU burns on this website
      </Typography>
    </Box>
  );
}
