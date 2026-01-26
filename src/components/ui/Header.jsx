import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles';

const Header = ({ title, subtitle = 'OUSL TRF Hostel', onNotificationPress, onNavigate, backgroundColor }) => {
  const handleNotificationPress = () => {
    if (onNotificationPress) {
      onNotificationPress();
    } else if (onNavigate) {
      onNavigate('announcements');
    } else {
      console.log('Notification pressed');
    }
  };

  return (
    <View style={[styles.header, backgroundColor && { backgroundColor }]}>
      <View>
        <Text style={styles.headerTitle}>{title}</Text>
        <Text style={styles.headerSubtitle}>{subtitle}</Text>
      </View>
      <TouchableOpacity 
        style={styles.notificationButton} 
        onPress={handleNotificationPress}
      >
        <Ionicons name="notifications-outline" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primary,
    padding: 20,
    paddingTop: 10,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textWhite,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.textWhite,
    marginTop: 5,
    opacity: 0.9,
  },
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

export default Header;
