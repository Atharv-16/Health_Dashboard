import React from 'react';
import { Box, Button, useTheme } from '@mui/material';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'activity', label: 'Activity' },
  { id: 'goals', label: 'Goals' },
  { id: 'insights', label: 'Insights' },
];

export const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        mb: 4,
        borderBottom: `1px solid ${theme.palette.divider}`,
        pb: 2,
      }}
    >
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant={activeTab === tab.id ? 'contained' : 'text'}
          onClick={() => onTabChange(tab.id)}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: activeTab === tab.id ? 'bold' : 'normal',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-1px)',
            },
          }}
        >
          {tab.label}
        </Button>
      ))}
    </Box>
  );
}; 