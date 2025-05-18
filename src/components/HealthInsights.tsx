import React from 'react';
import { Paper, Typography, Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { TrendingUp, TrendingDown, TrendingFlat } from '@mui/icons-material';
import { HealthData } from '../data/mockData';

interface HealthInsightsProps {
  data: HealthData[];
}

export const HealthInsights: React.FC<HealthInsightsProps> = ({ data }) => {
  if (!data || data.length < 2) {
    return (
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Health Insights
        </Typography>
        <Typography color="text.secondary">Not enough data for insights</Typography>
      </Paper>
    );
  }

  const getTrend = (current: number, previous: number) => {
    const diff = current - previous;
    const percentage = (diff / previous) * 100;
    
    if (Math.abs(percentage) < 5) {
      return { icon: <TrendingFlat />, text: 'Stable', color: 'info.main' };
    }
    return percentage > 0
      ? { icon: <TrendingUp />, text: 'Increasing', color: 'success.main' }
      : { icon: <TrendingDown />, text: 'Decreasing', color: 'error.main' };
  };

  const insights = [
    {
      title: 'Steps',
      current: data[0]?.steps || 0,
      previous: data[1]?.steps || 0,
      unit: 'steps',
    },
    {
      title: 'Heart Rate',
      current: data[0]?.heartRate || 0,
      previous: data[1]?.heartRate || 0,
      unit: 'bpm',
    },
    {
      title: 'Calories',
      current: data[0]?.caloriesBurned || 0,
      previous: data[1]?.caloriesBurned || 0,
      unit: 'kcal',
    },
    {
      title: 'Sleep',
      current: data[0]?.sleepHours || 0,
      previous: data[1]?.sleepHours || 0,
      unit: 'hours',
    },
  ];

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Health Insights
      </Typography>
      <List>
        {insights.map((insight) => {
          const trend = getTrend(insight.current, insight.previous);
          return (
            <ListItem key={insight.title}>
              <ListItemIcon sx={{ color: trend.color }}>
                {trend.icon}
              </ListItemIcon>
              <ListItemText
                primary={insight.title}
                secondary={
                  <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography component="span" color={trend.color}>
                      {trend.text}
                    </Typography>
                    <Typography component="span" color="text.secondary">
                      ({insight.current} {insight.unit})
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
}; 