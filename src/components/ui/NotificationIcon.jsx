import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const NotificationIcon = ({ onPress, size = 28, color = '#fff' }) => {
  return (
    <TouchableOpacity 
      style={styles.notificationButton} 
      onPress={onPress || (() => console.log('Notification pressed'))}
    >
      <Ionicons name="notifications-outline" size={size} color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  notificationButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
});

export default NotificationIcon;
