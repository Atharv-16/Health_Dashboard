import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  IconButton,
  useTheme,
} from '@mui/material';
import {
  Sync as SyncIcon,
  FileDownload as FileDownloadIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Flag as FlagIcon,
  TipsAndUpdates as TipsIcon,
} from '@mui/icons-material';
import { HealthMetricCard } from './HealthMetricCard';
import { HealthChart } from './HealthChart';
import { NotificationSystem } from './NotificationSystem';
import { HealthInsights } from './HealthInsights';
import { GoalTracker } from './GoalTracker';
import { HealthTips } from './HealthTips';
import { SidebarNavigation } from './SidebarNavigation';
import { FloatingNavButton } from './FloatingNavButton';
import { FadeInSection } from './FadeInSection';
import { CollapsibleSection } from './CollapsibleSection';
import { useTheme as useAppTheme } from '../context/ThemeContext';
import { generateMockData, HealthData } from '../data/mockData';

export const Dashboard: React.FC = () => {
  const [healthData, setHealthData] = useState<HealthData[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastSync, setLastSync] = useState<string>('');
  const [activeTab, setActiveTab] = useState('overview');
  const { theme, toggleTheme } = useAppTheme();
  const muiTheme = useTheme();

  useEffect(() => {
    setHealthData(generateMockData());
  }, []);

  const handleSync = () => {
    setLoading(true);
    setTimeout(() => {
      setHealthData(generateMockData());
      setLastSync(new Date().toISOString());
      setLoading(false);
    }, 1500);
  };

  const handleExportData = () => {
    const jsonString = JSON.stringify(healthData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `health-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <FadeInSection>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <CollapsibleSection
                  title="Daily Metrics"
                  icon={<SyncIcon />}
                  defaultExpanded={true}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <HealthMetricCard
                        title="Steps"
                        value={healthData[0]?.steps || 0}
                        unit="steps"
                        icon="👣"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <HealthMetricCard
                        title="Heart Rate"
                        value={healthData[0]?.heartRate || 0}
                        unit="bpm"
                        icon="❤️"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <HealthMetricCard
                        title="Calories"
                        value={healthData[0]?.caloriesBurned || 0}
                        unit="kcal"
                        icon="🔥"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <HealthMetricCard
                        title="Sleep"
                        value={healthData[0]?.sleepHours || 0}
                        unit="hours"
                        icon="😴"
                      />
                    </Grid>
                  </Grid>
                </CollapsibleSection>
              </Grid>
              <Grid item xs={12} md={6}>
                <CollapsibleSection
                  title="Goals"
                  icon={<FlagIcon />}
                  defaultExpanded={true}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <GoalTracker
                        title="Daily Steps"
                        current={healthData[0]?.steps || 0}
                        goal={10000}
                        unit="steps"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <GoalTracker
                        title="Active Minutes"
                        current={healthData[0]?.activeMinutes || 0}
                        goal={60}
                        unit="minutes"
                      />
                    </Grid>
                  </Grid>
                </CollapsibleSection>
              </Grid>
              <Grid item xs={12}>
                <CollapsibleSection
                  title="Health Tips"
                  icon={<TipsIcon />}
                  defaultExpanded={true}
                >
                  <HealthTips />
                </CollapsibleSection>
              </Grid>
            </Grid>
          </FadeInSection>
        );
      case 'activity':
        return (
          <FadeInSection delay={0.2}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <CollapsibleSection
                  title="Daily Activity"
                  icon={<SyncIcon />}
                  defaultExpanded={true}
                >
                  <HealthChart
                    data={healthData}
                    metric="steps"
                    title="Daily Steps"
                  />
                </CollapsibleSection>
              </Grid>
              <Grid item xs={12}>
                <CollapsibleSection
                  title="Heart Rate"
                  icon={<SyncIcon />}
                  defaultExpanded={true}
                >
                  <HealthChart
                    data={healthData}
                    metric="heartRate"
                    title="Heart Rate"
                  />
                </CollapsibleSection>
              </Grid>
            </Grid>
          </FadeInSection>
        );
      case 'goals':
        return (
          <FadeInSection delay={0.4}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <CollapsibleSection
                  title="Step Goals"
                  icon={<FileDownloadIcon />}
                  defaultExpanded={true}
                >
                  <GoalTracker
                    title="Daily Steps"
                    current={healthData[0]?.steps || 0}
                    goal={10000}
                    unit="steps"
                  />
                </CollapsibleSection>
              </Grid>
              <Grid item xs={12} md={6}>
                <CollapsibleSection
                  title="Activity Goals"
                  icon={<FileDownloadIcon />}
                  defaultExpanded={true}
                >
                  <GoalTracker
                    title="Active Minutes"
                    current={healthData[0]?.activeMinutes || 0}
                    goal={60}
                    unit="minutes"
                  />
                </CollapsibleSection>
              </Grid>
            </Grid>
          </FadeInSection>
        );
      case 'insights':
        return (
          <FadeInSection delay={0.6}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <CollapsibleSection
                  title="Health Insights"
                  icon={<FileDownloadIcon />}
                  defaultExpanded={true}
                >
                  <HealthInsights data={healthData} />
                </CollapsibleSection>
              </Grid>
            </Grid>
          </FadeInSection>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <SidebarNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: '64px',
          p: 3,
          backgroundColor: muiTheme.palette.background.default,
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 4,
            }}
          >
            <Typography variant="h4" component="h1" gutterBottom>
              Health Dashboard
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                startIcon={<SyncIcon />}
                onClick={handleSync}
                disabled={loading}
              >
                {loading ? 'Syncing...' : 'Sync Data'}
              </Button>
              <Button
                variant="outlined"
                startIcon={<FileDownloadIcon />}
                onClick={handleExportData}
              >
                Export Data
              </Button>
              <IconButton onClick={toggleTheme} color="inherit">
                {theme === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Box>
          </Box>
          {renderTabContent()}
          <FloatingNavButton activeTab={activeTab} onNavigate={setActiveTab} />
          <NotificationSystem />
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard; 