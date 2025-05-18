import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { HealthData } from '../data/mockData';

interface HealthChartProps {
  data: HealthData[];
  metric: keyof HealthData;
  title: string;
}

export const HealthChart: React.FC<HealthChartProps> = ({
  data,
  metric,
  title,
}) => {
  if (!data || data.length === 0) {
    return (
      <Paper elevation={2} sx={{ p: 3, height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography color="text.secondary">No data available</Typography>
      </Paper>
    );
  }

  const maxValue = Math.max(...data.map(d => d[metric] as number));
  const minValue = Math.min(...data.map(d => d[metric] as number));
  const range = maxValue - minValue;

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        height: '300px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'flex-end',
          gap: 1,
          mt: 2,
        }}
      >
        {data.map((item, index) => {
          const value = item[metric] as number;
          const height = range === 0 ? 50 : ((value - minValue) / range) * 100;
          
          return (
            <Box
              key={index}
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: `${height}%`,
                  backgroundColor: 'primary.main',
                  borderRadius: '4px 4px 0 0',
                  transition: 'height 0.3s ease',
                  minHeight: '4px',
                }}
              />
              <Typography variant="caption" color="text.secondary">
                {new Date(item.lastSync).toLocaleDateString('en-US', { weekday: 'short' })}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {value.toLocaleString()}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
}; 