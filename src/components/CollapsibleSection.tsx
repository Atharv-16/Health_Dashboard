import React from 'react';
import {
  Paper,
  Typography,
  Box,
  IconButton,
  Collapse,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

interface CollapsibleSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

export const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  icon,
  children,
  defaultExpanded = true,
}) => {
  const [expanded, setExpanded] = React.useState(defaultExpanded);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: (theme) =>
            theme.palette.mode === 'dark'
              ? '0 0 20px rgba(33, 150, 243, 0.2)'
              : '0 4px 12px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          userSelect: 'none',
        }}
        onClick={handleToggle}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {icon}
          <Typography variant="h6">{title}</Typography>
        </Box>
        <IconButton
          size="small"
          sx={{
            transition: 'transform 0.3s ease',
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>
      <Collapse in={expanded} timeout={300}>
        <Box sx={{ mt: 2 }}>{children}</Box>
      </Collapse>
    </Paper>
  );
}; 