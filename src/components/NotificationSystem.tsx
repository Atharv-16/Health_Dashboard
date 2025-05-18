import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Badge,
  Menu,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  EmojiEvents as EmojiEventsIcon,
  Warning as WarningIcon,
  AccessTime as AccessTimeIcon,
} from '@mui/icons-material';

export const NotificationSystem: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notifications] = useState([
    {
      id: 1,
      type: 'achievement',
      message: 'Congratulations! You reached your daily step goal!',
      icon: <EmojiEventsIcon color="primary" />,
      time: '2 hours ago',
    },
    {
      id: 2,
      type: 'alert',
      message: 'Your heart rate is higher than usual',
      icon: <WarningIcon color="error" />,
      time: '1 hour ago',
    },
    {
      id: 3,
      type: 'reminder',
      message: 'Time to take a break and stretch',
      icon: <AccessTimeIcon color="info" />,
      time: '30 minutes ago',
    },
  ]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ position: 'fixed', top: 16, right: 16, zIndex: 1000 }}>
      <IconButton
        color="inherit"
        onClick={handleClick}
        sx={{
          backgroundColor: 'background.paper',
          '&:hover': {
            backgroundColor: 'action.hover',
          },
        }}
      >
        <Badge badgeContent={notifications.length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: 320,
            maxHeight: 400,
          },
        }}
      >
        <List>
          {notifications.map((notification: any) => (
            <ListItem key={notification.id} divider>
              <ListItemIcon>{notification.icon}</ListItemIcon>
              <ListItemText
                primary={notification.message}
                secondary={notification.time}
              />
            </ListItem>
          ))}
        </List>
      </Menu>
    </Box>
  );
}; 