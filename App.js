import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Profile from './src/screens/Profile.jsx';
import ColorDemo from './src/screens/ColorDemo.jsx';
import DashboardScreen from './src/screens/dashboardScreen.jsx';
import LoginScreen from './src/screens/LoginScreen.jsx';

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        {/* <ColorDemo /> */}
        <DashboardScreen />
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
