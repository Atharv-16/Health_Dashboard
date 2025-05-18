export interface HealthData {
  date: string;
  steps: number;
  heartRate: number;
  caloriesBurned: number;
  sleepHours: number;
  activeMinutes: number;
}

export const generateMockData = (days: number = 7): HealthData[] => {
  const data: HealthData[] = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    data.push({
      date: date.toISOString().split('T')[0],
      steps: Math.floor(Math.random() * 5000) + 5000, // 5000-10000 steps
      heartRate: Math.floor(Math.random() * 40) + 60, // 60-100 bpm
      caloriesBurned: Math.floor(Math.random() * 500) + 1500, // 1500-2000 calories
      sleepHours: Math.floor(Math.random() * 3) + 6, // 6-9 hours
      activeMinutes: Math.floor(Math.random() * 60) + 30, // 30-90 minutes
    });
  }

  return data;
};

export const mockData = generateMockData(); 