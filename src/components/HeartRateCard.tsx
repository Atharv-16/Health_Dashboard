import React from 'react';
import { Paper, Typography, Box, Alert } from '@mui/material';
import { TrendingUp, TrendingDown, Favorite } from '@mui/icons-material';
import { HealthData } from '../data/mockData';

interface HeartRateCardProps {
  data: HealthData[];
}

export const HeartRateCard: React.FC<HeartRateCardProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography color="text.secondary">No heart rate data available</Typography>
      </Paper>
    );
  }

  // Calculate metrics
  const currentHeartRate = data[0].heartRate;
  const previousHeartRate = data[1]?.heartRate || currentHeartRate;
  const averageHeartRate = Math.round(
    data.reduce((sum, d) => sum + d.heartRate, 0) / data.length
  );

  // Find anomalies (heart rate > 100 or < 50)
  const anomalies = data
    .filter(d => d.heartRate > 100 || d.heartRate < 50)
    .map(d => ({
      value: d.heartRate,
      time: new Date(d.lastSync).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
      }),
    }));

  // Determine health status
  const getHealthStatus = () => {
    if (currentHeartRate < 60) return { message: 'Your heart rate is below normal', color: 'warning' };
    if (currentHeartRate > 100) return { message: 'Your heart rate is above normal', color: 'error' };
    return { message: 'Your heart rate is in a healthy range!', color: 'success' };
  };

  const healthStatus = getHealthStatus();

  // Calculate trend
  const trend = currentHeartRate - previousHeartRate;
  const trendIcon = trend > 0 ? <TrendingUp color="error" /> : <TrendingDown color="success" />;
  const trendText = trend > 0 ? 'increasing' : 'decreasing';

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Favorite color="error" sx={{ fontSize: 40 }} />
        <Box>
          <Typography variant="h4" component="div">
            {currentHeartRate} bpm
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Current Heart Rate
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Box>
          <Typography variant="h6" color="text.secondary">
            Today's Average
          </Typography>
          <Typography variant="h5">
            {averageHeartRate} bpm
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'right' }}>
          <Typography variant="h6" color="text.secondary">
            Trend
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {trendIcon}
            <Typography variant="h5">
              {Math.abs(trend)} bpm {trendText}
            </Typography>
          </Box>
        </Box>
      </Box>

      {anomalies.length > 0 && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Heart Rate Alerts:
          </Typography>
          {anomalies.map((anomaly, index) => (
            <Typography key={index} variant="body2">
              {anomaly.value > 100 ? 'High' : 'Low'}: {anomaly.value} bpm at {anomaly.time}
            </Typography>
          ))}
        </Alert>
      )}

      <Alert severity={healthStatus.color as any}>
        {healthStatus.message}
      </Alert>
    </Paper>
  );
}; 