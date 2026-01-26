import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useState } from 'react';
import Profile from './src/screens/Profile.jsx';
import ColorDemo from './src/screens/ColorDemo.jsx';
import DashboardScreen from './src/screens/dashboardScreen.jsx';
import StartScreen from './src/screens/StartScreen.jsx';
import LoginScreen from './src/screens/LoginScreen.jsx';
import QrCodeScanScreen from './src/screens/qrCodeScanScreen.jsx';
import ComplainScreen from './src/screens/ComplainScreen.jsx';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('start');

  const handleNavigation = (screen) => {
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'start':
        return <StartScreen onNavigate={() => setCurrentScreen('login')} />;
      case 'login':
        return <LoginScreen onNavigate={() => setCurrentScreen('dashboard')} />;
      case 'dashboard':
        return <DashboardScreen onNavigate={handleNavigation} />;
      case 'qrscan':
        return <QrCodeScanScreen onNavigate={handleNavigation} />;
      case 'complain':
        return <ComplainScreen onNavigate={handleNavigation} />;
      case 'profile':
        return <Profile onNavigate={handleNavigation} />;
      default:
        return <StartScreen onNavigate={() => setCurrentScreen('login')} />;
    }
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        {renderScreen()}
        <StatusBar style="auto" />
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
