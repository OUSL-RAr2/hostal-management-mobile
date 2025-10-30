import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DashboardScreen from './src/screens/dashboardScreen.jsx';

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
