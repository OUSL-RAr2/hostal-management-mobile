import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Profile from './src/screens/Profile.jsx';
import ColorDemo from './src/screens/ColorDemo.jsx';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <ColorDemo /> */}
        <Profile />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
