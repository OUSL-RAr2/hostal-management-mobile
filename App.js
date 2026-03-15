import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import Profile from './src/screens/Profile.jsx';
import ColorDemo from './src/screens/ColorDemo.jsx';
import DashboardScreen from './src/screens/dashboardScreen.jsx';
import StartScreen from './src/screens/StartScreen.jsx';
import LoginScreen from './src/screens/LoginScreen.jsx';
import QrCodeScanScreen from './src/screens/qrCodeScanScreen.jsx';
import ComplainScreen from './src/screens/ComplainScreen.jsx';
import AnnouncementScreen from './src/screens/AnnouncementScreen.jsx';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(null); // null = checking session

  useEffect(() => {
    // Check for a persisted token and skip login if found
    SecureStore.getItemAsync('token').then((token) => {
      setCurrentScreen(token ? 'dashboard' : 'start');
    }).catch(() => {
      setCurrentScreen('start');
    });
  }, []);

  const handleNavigation = (screen) => {
    setCurrentScreen(screen);
  };

  if (currentScreen === null) {
    // Still checking SecureStore — show a plain white loader so there's no flash
    return (
      <SafeAreaProvider>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size='large' color='#C25B00' />
        </View>
      </SafeAreaProvider>
    );
  }

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
      case 'announcements':
        return <AnnouncementScreen onNavigate={handleNavigation} />;
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
  loadingContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
