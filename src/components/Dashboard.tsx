import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  CircularProgress,
} from '@mui/material';
import {
  DirectionsWalk,
  Favorite,
  LocalFireDepartment,
  Bedtime,
  Timer,
} from '@mui/icons-material';
import { HealthChart } from './HealthChart';
import { HealthMetricCard } from './HealthMetricCard';
import { mockData, generateMockData, HealthData } from '../data/mockData';

export const Dashboard: React.FC = () => {
  const [data, setData] = useState<HealthData[]>(mockData);
  const [isLoading, setIsLoading] = useState(false);
  const [lastSync, setLastSync] = useState<Date>(new Date());

  const handleSync = () => {
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      setData(generateMockData());
      setLastSync(new Date());
      setIsLoading(false);
    }, 1500);
  };

  const latestData = data[data.length - 1];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1">
          Health Dashboard
        </Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <Typography variant="body2" color="text.secondary">
            Last synced: {lastSync.toLocaleTimeString()}
          </Typography>
          <Button
            variant="contained"
            onClick={handleSync}
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={20} /> : null}
          >
            {isLoading ? 'Syncing...' : 'Sync Now'}
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={2.4}>
          <HealthMetricCard
            title="Steps"
            value={latestData.steps}
            unit="steps today"
            icon={<DirectionsWalk />}
            color="#2196f3"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <HealthMetricCard
            title="Heart Rate"
            value={latestData.heartRate}
            unit="bpm"
            icon={<Favorite />}
            color="#f44336"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <HealthMetricCard
            title="Calories"
            value={latestData.caloriesBurned}
            unit="calories burned"
            icon={<LocalFireDepartment />}
            color="#ff9800"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <HealthMetricCard
            title="Sleep"
            value={latestData.sleepHours}
            unit="hours"
            icon={<Bedtime />}
            color="#9c27b0"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <HealthMetricCard
            title="Active Time"
            value={latestData.activeMinutes}
            unit="minutes"
            icon={<Timer />}
            color="#4caf50"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <HealthChart
              data={data}
              metric="steps"
              title="Daily Steps"
              color="#2196f3"
              yAxisLabel="Steps"
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <HealthChart
              data={data}
              metric="heartRate"
              title="Heart Rate"
              color="#f44336"
              yAxisLabel="BPM"
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <HealthChart
              data={data}
              metric="caloriesBurned"
              title="Calories Burned"
              color="#ff9800"
              yAxisLabel="Calories"
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <HealthChart
              data={data}
              metric="sleepHours"
              title="Sleep Duration"
              color="#9c27b0"
              yAxisLabel="Hours"
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}; 