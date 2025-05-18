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
    title: 'Take Breaks',
    content: 'Stand up and stretch every hour to reduce sedentary behavior.',
    icon: '⏰',
  },
  {
    title: 'Sleep Well',
    content: 'Aim for 7-9 hours of sleep for better recovery and performance.',
    icon: '😴',
  },
  {
    title: 'Move More',
    content: 'Take the stairs instead of the elevator when possible.',
    icon: '🚶',
  },
  {
    title: 'Mind Your Posture',
    content: 'Keep your back straight and shoulders relaxed while sitting.',
    icon: '🧘',
  },
];

export const HealthTips: React.FC = () => {
  const [currentTip, setCurrentTip] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    let interval: number;
    if (isAutoPlaying) {
      interval = window.setInterval(() => {
        setCurrentTip((prev) => (prev + 1) % tips.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setCurrentTip((prev) => (prev - 1 + tips.length) % tips.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentTip((prev) => (prev + 1) % tips.length);
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Health Tips
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <IconButton onClick={handlePrevious} color="primary">
          <NavigateBefore />
        </IconButton>
        <Box
          sx={{
            flex: 1,
            textAlign: 'center',
            minHeight: 100,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h4" sx={{ mb: 1 }}>
            {tips[currentTip].icon}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            {tips[currentTip].title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {tips[currentTip].content}
          </Typography>
        </Box>
        <IconButton onClick={handleNext} color="primary">
          <NavigateNext />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 1,
          mt: 2,
        }}
      >
        {tips.map((_, index) => (
          <Box
            key={index}
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              bgcolor: index === currentTip ? 'primary.main' : 'grey.300',
              transition: 'background-color 0.3s',
            }}
          />
        ))}
      </Box>
    </Paper>
  );
}; 