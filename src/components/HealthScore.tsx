import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { HealthData } from '../data/mockData';

interface HealthScoreProps {
  data: HealthData;
}

export const HealthScore: React.FC<HealthScoreProps> = ({ data }) => {
  const calculateHealthScore = (data: HealthData): number => {
    const weights = {
      steps: 0.3,
      heartRate: 0.2,
      sleepHours: 0.3,
      activeMinutes: 0.2,
    };

    const stepScore = Math.min((data.steps / 10000) * 100, 100);
    const heartRateScore = data.heartRate >= 60 && data.heartRate <= 100 ? 100 : 50;
    const sleepScore = Math.min((data.sleepHours / 8) * 100, 100);
    const activeScore = Math.min((data.activeMinutes / 60) * 100, 100);

    return Math.round(
      stepScore * weights.steps +
      heartRateScore * weights.heartRate +
      sleepScore * weights.sleepHours +
      activeScore * weights.activeMinutes
    );
  };

  const score = calculateHealthScore(data);
  const getScoreColor = (score: number): string => {
    if (score >= 80) return '#4CAF50';
    if (score >= 60) return '#FFC107';
    return '#F44336';
  };

  return (
    <Paper
      sx={{
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
        backdropFilter: 'blur(10px)',
        borderRadius: 4,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant="h6" gutterBottom>
        Health Score
      </Typography>
      <Box sx={{ width: 150, height: 150 }}>
        <CircularProgressbar
          value={score}
          text={`${score}`}
          styles={buildStyles({
            pathColor: getScoreColor(score),
            textColor: getScoreColor(score),
            trailColor: 'rgba(255, 255, 255, 0.1)',
            textSize: '24px',
          })}
        />
      </Box>
      <Typography variant="body2" color="text.secondary" align="center">
        {score >= 80
          ? 'Excellent! Keep up the good work!'
          : score >= 60
          ? 'Good job! Room for improvement.'
          : 'Let\'s work on improving your health score!'}
      </Typography>
    </Paper>
  );
}; 