import React, { useState, useEffect } from 'react';
import { Paper, Typography, Box, IconButton } from '@mui/material';
import { NavigateNext, NavigateBefore } from '@mui/icons-material';

const tips = [
  {
    title: 'Stay Hydrated',
    content: 'Drink at least 8 glasses of water daily to maintain optimal health.',
    icon: '💧',
  },
  {
    title: 'Take Regular Breaks',
    content: 'Every 30 minutes, take a 5-minute break to stretch and move around.',
    icon: '⏰',
  },
  {
    title: 'Mindful Breathing',
    content: 'Practice deep breathing exercises to reduce stress and improve focus.',
    icon: '🧘',
  },
  {
    title: 'Healthy Snacking',
    content: 'Choose nutrient-rich snacks like fruits and nuts for sustained energy.',
    icon: '🥗',
  },
];

export const HealthTips: React.FC = () => {
  const [currentTip, setCurrentTip] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        setCurrentTip((prev) => (prev + 1) % tips.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [isPaused]);

  const handlePrevious = () => {
    setCurrentTip((prev) => (prev - 1 + tips.length) % tips.length);
    setIsPaused(true);
  };

  const handleNext = () => {
    setCurrentTip((prev) => (prev + 1) % tips.length);
    setIsPaused(true);
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          '& .tip-controls': {
            opacity: 1,
          },
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2,
        }}
      >
        <Typography variant="h6">Health Tips</Typography>
        <Box
          sx={{
            display: 'flex',
            gap: 1,
          }}
        >
          {tips.map((_, index) => (
            <Box
              key={index}
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: currentTip === index ? 'primary.main' : 'action.disabled',
                transition: 'background-color 0.3s',
              }}
            />
          ))}
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          minHeight: 100,
        }}
      >
        <Typography variant="h2" component="div">
          {tips[currentTip].icon}
        </Typography>
        <Box>
          <Typography variant="subtitle1" gutterBottom>
            {tips[currentTip].title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {tips[currentTip].content}
          </Typography>
        </Box>
      </Box>
      <Box
        className="tip-controls"
        sx={{
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'space-between',
          transform: 'translateY(-50%)',
          opacity: 0,
          transition: 'opacity 0.3s',
          px: 2,
        }}
      >
        <IconButton
          onClick={handlePrevious}
          sx={{
            backgroundColor: 'background.paper',
            '&:hover': { backgroundColor: 'action.hover' },
          }}
        >
          <NavigateBefore />
        </IconButton>
        <IconButton
          onClick={handleNext}
          sx={{
            backgroundColor: 'background.paper',
            '&:hover': { backgroundColor: 'action.hover' },
          }}
        >
          <NavigateNext />
        </IconButton>
      </Box>
    </Paper>
  );
}; 