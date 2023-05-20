import React from 'react';
import Typography from '@mui/material/Typography';

export default function LatestBurnsLabel() {
  return (
    <Typography
      variant="h4"
      component="div"
      sx={{
        mt: 2,
        mb: 2,
        fontWeight: 800,
        textAlign: 'center', // Add this line to center the text horizontally
      }}
      className="latestBurnsLabel"
    >
          Latest Burns
    </Typography>

  );
}
