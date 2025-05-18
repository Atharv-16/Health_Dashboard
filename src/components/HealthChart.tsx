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

  // Filter out non-numeric values and calculate min/max
  const values = data.map(d => d[metric] as number).filter(v => !isNaN(v));
  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);
  const range = maxValue - minValue;

  // Get appropriate unit based on metric
  const getUnit = () => {
    switch (metric) {
      case 'steps': return 'steps';
      case 'heartRate': return 'bpm';
      case 'sleepHours': return 'hrs';
      case 'activeMinutes': return 'min';
      case 'caloriesBurned': return 'kcal';
      case 'waterIntake': return 'glasses';
      default: return '';
    }
  };

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
          // Calculate height as percentage of range, with minimum height of 4px
          const height = range === 0 ? 50 : Math.max(4, ((value - minValue) / range) * 100);
          
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
                {value.toLocaleString()} {getUnit()}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
}; 