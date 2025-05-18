import React from 'react';
import { Fab } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import {
  Menu,
  MenuItem,
  IconButton,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  FitnessCenter as FitnessCenterIcon,
  Flag as FlagIcon,
  Insights as InsightsIcon,
} from '@mui/icons-material';

interface FloatingNavButtonProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
}

const tabs = [
  { id: 'overview', icon: <DashboardIcon />, label: 'Overview' },
  { id: 'activity', icon: <FitnessCenterIcon />, label: 'Activity' },
  { id: 'goals', icon: <FlagIcon />, label: 'Goals' },
  { id: 'insights', icon: <InsightsIcon />, label: 'Insights' },
];

export const FloatingNavButton: React.FC<FloatingNavButtonProps> = ({
  activeTab,
  onNavigate,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (tab: string) => {
    onNavigate(tab);
    handleClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 1000,
      }}
    >
      <Fab
        color="primary"
        onClick={handleClick}
        sx={{
          boxShadow: (theme) =>
            theme.palette.mode === 'dark'
              ? '0 0 20px rgba(33, 150, 243, 0.3)'
              : '0 4px 12px rgba(0, 0, 0, 0.15)',
        }}
      >
        <AddIcon />
      </Fab>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        {tabs.map((tab) => (
          <MenuItem
            key={tab.id}
            onClick={() => handleNavigate(tab.id)}
            selected={activeTab === tab.id}
          >
            <IconButton
              size="small"
              sx={{
                mr: 1,
                color: activeTab === tab.id ? 'primary.main' : 'inherit',
              }}
            >
              {tab.icon}
            </IconButton>
            {tab.label}
          </MenuItem>
        ))}
      </Menu>
    </motion.div>
  );
}; 