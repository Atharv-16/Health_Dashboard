import { CssBaseline } from '@mui/material';
import { Dashboard } from './components/Dashboard';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <Dashboard />
    </ThemeProvider>
  );
}

export default App; 