import React, { useState, useEffect } from 'react';
import { Snackbar, Alert, IconButton } from '@mui/material';
import { Close, Notifications } from '@mui/icons-material';
import { HealthData } from '../data/mockData';

interface Notification {
  id: number;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface NotificationSystemProps {
  data: HealthData[];
  onSync: () => void;
}

export const NotificationSystem: React.FC<NotificationSystemProps> = ({ data, onSync }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);

  const generateNotification = (data: HealthData): Notification | null => {
    const latestData = data;
    
    if (latestData.steps >= 10000) {
      return {
        id: Date.now(),
        message: '🎉 Congratulations! You\'ve reached your daily step goal!',
        type: 'success',
      };
    }
    
    if (latestData.heartRate > 90) {
      return {
        id: Date.now(),
        message: '⚠️ Your heart rate is elevated. Consider taking a break.',
        type: 'warning',
      };
    }
    
    if (latestData.sleepHours < 7) {
      return {
        id: Date.now(),
        message: '💤 You\'re getting less sleep than recommended.',
        type: 'info',
      };
    }

    return null;
  };

  useEffect(() => {
    const notification = generateNotification(data[data.length - 1]);
    if (notification) {
      setNotifications((prev) => [...prev, notification]);
    }
  }, [data]);

  useEffect(() => {
    if (notifications.length > 0 && !currentNotification) {
      setCurrentNotification(notifications[0]);
    }
  }, [notifications, currentNotification]);

  const handleClose = () => {
    setCurrentNotification(null);
    setNotifications((prev) => prev.slice(1));
  };

  return (
    <>
      <IconButton
        color="primary"
        onClick={onSync}
        sx={{ position: 'fixed', bottom: 16, right: 16, bgcolor: 'background.paper' }}
      >
        <Notifications />
      </IconButton>
      <Snackbar
        open={!!currentNotification}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleClose}
          severity={currentNotification?.type}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {currentNotification?.message}
        </Alert>
      </Snackbar>
    </>
  );
}; 