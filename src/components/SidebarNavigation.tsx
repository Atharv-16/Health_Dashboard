import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import {
  Dashboard as DashboardIcon,
  FitnessCenter as FitnessCenterIcon,
  Flag as FlagIcon,
  Insights as InsightsIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

interface SidebarNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'overview', icon: <DashboardIcon />, label: 'Overview' },
  { id: 'activity', icon: <FitnessCenterIcon />, label: 'Activity' },
  { id: 'goals', icon: <FlagIcon />, label: 'Goals' },
  { id: 'insights', icon: <InsightsIcon />, label: 'Insights' },
];

export const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <Box
      sx={{
        width: 64,
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        backgroundColor: 'background.paper',
        borderRight: 1,
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pt: 2,
      }}
    >
      {tabs.map((tab) => (
        <Tooltip key={tab.id} title={tab.label} placement="right">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <IconButton
              onClick={() => onTabChange(tab.id)}
              sx={{
                mb: 2,
                color: activeTab === tab.id ? 'primary.main' : 'text.secondary',
                backgroundColor: activeTab === tab.id ? 'action.selected' : 'transparent',
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              {tab.icon}
            </IconButton>
          </motion.div>
        </Tooltip>
      ))}
    </Box>
  );
}; 