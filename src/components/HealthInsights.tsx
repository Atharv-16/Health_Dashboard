import React from 'react';
import { Paper, Typography, Box, Chip, IconButton } from '@mui/material';
import { EmojiEvents, TrendingUp, TrendingDown, Info } from '@mui/icons-material';
import { HealthData } from '../data/mockData';

interface HealthInsightsProps {
  data: HealthData[];
}

export const HealthInsights: React.FC<HealthInsightsProps> = ({ data }) => {
  const latestData = data[data.length - 1];
  const previousData = data[data.length - 2];

  const calculateTrend = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100;
    return {
      value: Math.abs(change).toFixed(1),
      isPositive: change > 0,
    };
  };

  const insights = [
    {
      title: 'Steps Goal',
      value: latestData.steps,
      target: 10000,
      icon: <EmojiEvents color="primary" />,
      trend: calculateTrend(latestData.steps, previousData.steps),
    },
    {
      title: 'Heart Rate',
      value: latestData.heartRate,
      target: 75,
      icon: <Info color="secondary" />,
      trend: calculateTrend(latestData.heartRate, previousData.heartRate),
    },
    {
      title: 'Sleep Quality',
      value: latestData.sleepHours,
      target: 8,
      icon: <Info color="secondary" />,
      trend: calculateTrend(latestData.sleepHours, previousData.sleepHours),
    },
  ];

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Health Insights
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {insights.map((insight) => (
          <Box
            key={insight.title}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: 2,
              bgcolor: 'background.paper',
              borderRadius: 1,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {insight.icon}
              <Box>
                <Typography variant="subtitle1">{insight.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {insight.value} / {insight.target} target
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {insight.trend.isPositive ? (
                <TrendingUp color="success" />
              ) : (
                <TrendingDown color="error" />
              )}
              <Chip
                size="small"
                label={`${insight.trend.isPositive ? '+' : '-'}${insight.trend.value}%`}
                color={insight.trend.isPositive ? 'success' : 'error'}
              />
            </Box>
          </Box>
        ))}
      </Box>
    </Paper>
  );
}; 