import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { HealthData } from '../data/mockData';

interface HealthMetricCardProps {
  title: string;
  value: number;
  unit: string;
  icon: React.ReactNode;
  color: string;
}

export const HealthMetricCard: React.FC<HealthMetricCardProps> = ({
  title,
  value,
  unit,
  icon,
  color,
}) => {
  return (
    <Card sx={{ minWidth: 200, height: '100%' }}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Box
            sx={{
              backgroundColor: color + '20',
              borderRadius: '50%',
              p: 1,
              mr: 2,
            }}
          >
            {icon}
          </Box>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
        </Box>
        <Typography variant="h4" component="div" sx={{ mb: 1 }}>
          {value.toLocaleString()}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {unit}
        </Typography>
      </CardContent>
    </Card>
  );
}; 