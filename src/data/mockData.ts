export interface HealthData {
  steps: number;
  heartRate: number;
  sleepHours: number;
  activeMinutes: number;
  caloriesBurned: number;
  waterIntake: number;
  lastSync: string;
}

export const generateMockData = (): HealthData[] => {
  const data: HealthData[] = [];
  const now = new Date();

  // Generate 7 days of data
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    data.push({
      steps: Math.floor(Math.random() * 5000) + 5000, // 5000-10000 steps
      heartRate: Math.floor(Math.random() * 30) + 70, // 70-100 bpm
      sleepHours: Math.floor(Math.random() * 3) + 6, // 6-9 hours
      activeMinutes: Math.floor(Math.random() * 60) + 30, // 30-90 minutes
      caloriesBurned: Math.floor(Math.random() * 500) + 1500, // 1500-2000 calories
      waterIntake: Math.floor(Math.random() * 4) + 6, // 6-10 glasses
      lastSync: date.toISOString(),
    });
  }

  return data;
};

export const mockData = generateMockData(); 