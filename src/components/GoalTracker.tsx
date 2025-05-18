import React, { useState, useEffect } from 'react';
import { Paper, Typography, Box, IconButton, Tooltip } from '@mui/material';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Edit, Check } from '@mui/icons-material';
import Confetti from 'react-confetti';
import { HealthData } from '../data/mockData';

interface GoalTrackerProps {
  data: HealthData;
  metric: keyof Omit<HealthData, 'date'>;
  title: string;
  color: string;
  defaultGoal: number;
}

export const GoalTracker: React.FC<GoalTrackerProps> = ({
  data,
  metric,
  title,
  color,
  defaultGoal,
}) => {
  const [goal, setGoal] = useState<number>(() => {
    const savedGoal = localStorage.getItem(`${metric}Goal`);
    return savedGoal ? parseInt(savedGoal) : defaultGoal;
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    localStorage.setItem(`${metric}Goal`, goal.toString());
  }, [goal, metric]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const currentValue = data[metric];
  const percentage = Math.min((currentValue / goal) * 100, 100);

  useEffect(() => {
    if (percentage >= 100 && !showConfetti) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  }, [percentage, showConfetti]);

  const handleGoalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newGoal = parseInt(event.target.value);
    if (!isNaN(newGoal) && newGoal > 0) {
      setGoal(newGoal);
    }
  };

  return (
    <Paper sx={{ p: 3, position: 'relative' }}>
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
        />
      )}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">{title} Goal</Typography>
        <Box display="flex" alignItems="center" gap={1}>
          {isEditing ? (
            <>
              <input
                type="number"
                value={goal}
                onChange={handleGoalChange}
                style={{
                  width: '80px',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
              />
              <IconButton
                size="small"
                onClick={() => setIsEditing(false)}
                color="primary"
              >
                <Check />
              </IconButton>
            </>
          ) : (
            <Tooltip title="Edit Goal">
              <IconButton
                size="small"
                onClick={() => setIsEditing(true)}
                color="primary"
              >
                <Edit />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Box>
      <Box sx={{ width: '100%', maxWidth: 200, margin: '0 auto' }}>
        <CircularProgressbar
          value={percentage}
          text={`${Math.round(percentage)}%`}
          styles={buildStyles({
            pathColor: color,
            textColor: color,
            trailColor: '#e0e0e0',
          })}
        />
      </Box>
      <Box mt={2} textAlign="center">
        <Typography variant="body2" color="text.secondary">
          {currentValue.toLocaleString()} / {goal.toLocaleString()}
        </Typography>
      </Box>
    </Paper>
  );
}; 