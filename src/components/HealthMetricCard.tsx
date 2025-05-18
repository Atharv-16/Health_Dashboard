import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

interface HealthMetricCardProps {
  title: string;
  value: number;
  unit: string;
  icon: string;
}

export const HealthMetricCard: React.FC<HealthMetricCardProps> = ({
  title,
  value,
  unit,
  icon,
}) => {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
        },
      }}
    >
      <Typography variant="h2" component="div" sx={{ mb: 1 }}>
        {icon}
      </Typography>
      <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
        {value.toLocaleString()}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {unit}
      </Typography>
    </Paper>
  );
}; 