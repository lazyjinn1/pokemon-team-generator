import ReactDOM from 'react-dom/client';
import './index.css';
import MainPage from './components/mainComponents/MainPage';
import { SettingsProvider } from './context/SettingsContext';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { useSettings } from './context/SettingsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
function AppWrapper() {
  const { settings } = useSettings();

  return (
    <div className={`min-h-screen transition-colors ${settings.darkMode ? 'bg-slate-800 text-white' : 'bg-white text-black'}`}>
      <MainPage />
    </div>
  );
}

root.render(
  <BrowserRouter>
    <SettingsProvider>
      <AppWrapper />
    </SettingsProvider>
  </BrowserRouter>
);

reportWebVitals();