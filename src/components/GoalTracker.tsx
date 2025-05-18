import React, { useState } from 'react';
import { Paper, Typography, Box, IconButton, TextField } from '@mui/material';
import { Edit as EditIcon, Check as CheckIcon } from '@mui/icons-material';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface GoalTrackerProps {
  title: string;
  current: number;
  goal: number;
  unit: string;
}

export const GoalTracker: React.FC<GoalTrackerProps> = ({
  title,
  current,
  goal,
  unit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [customGoal, setCustomGoal] = useState(goal);
  const progress = Math.min((current / customGoal) * 100, 100);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 100) return '#4CAF50';
    if (progress >= 75) return '#2196F3';
    if (progress >= 50) return '#FFC107';
    return '#F44336';
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          mb: 2,
        }}
      >
        <Typography variant="h6">{title}</Typography>
        {isEditing ? (
          <IconButton onClick={handleSave} color="primary">
            <CheckIcon />
          </IconButton>
        ) : (
          <IconButton onClick={handleEdit} color="primary">
            <EditIcon />
          </IconButton>
        )}
      </Box>
      <Box sx={{ width: 150, height: 150, mb: 2 }}>
        <CircularProgressbar
          value={progress}
          text={`${Math.round(progress)}%`}
          styles={buildStyles({
            pathColor: getProgressColor(progress),
            textColor: getProgressColor(progress),
            trailColor: '#e6e6e6',
          })}
        />
      </Box>
      {isEditing ? (
        <TextField
          type="number"
          value={customGoal}
          onChange={(e) => setCustomGoal(Number(e.target.value))}
          size="small"
          sx={{ width: '100%' }}
        />
      ) : (
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" component="div" gutterBottom>
            {current.toLocaleString()} / {customGoal.toLocaleString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {unit}
          </Typography>
        </Box>
      )}
    </Paper>
  );
}; 