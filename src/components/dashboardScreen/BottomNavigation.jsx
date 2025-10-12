// Bottom Navigation Component - Reusable across screens
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

const BottomNavigation = ({ activeTab = 'Home' }) => {
  return (
    <View style={styles.bottomTabBar}>
      <TouchableOpacity style={styles.tabItem} onPress={() => console.log('Home pressed')}>
        <Ionicons name="home-outline" size={24} color={activeTab === 'Home' ? '#D2691E' : '#666'} />
        <Text style={[styles.tabText, activeTab === 'Home' && { color: '#D2691E' }]}>
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tabItem} onPress={() => console.log('QR Scan pressed')}>
        <MaterialCommunityIcons name="qrcode-scan" size={24} color={activeTab === 'QR Scan' ? '#D2691E' : '#666'} />
        <Text style={[styles.tabText, activeTab === 'QR Scan' && { color: '#D2691E' }]}>
          QR Scan
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tabItem} onPress={() => console.log('Complain pressed')}>
        <MaterialCommunityIcons name="chat-alert-outline" size={24} color={activeTab === 'Complain' ? '#D2691E' : '#666'} />
        <Text style={[styles.tabText, activeTab === 'Complain' && { color: '#D2691E' }]}>
          Complain
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tabItem} onPress={() => console.log('Profile pressed')}>
        <Ionicons name="person" size={24} color={activeTab === 'Profile' ? '#D2691E' : '#666'} />
        <Text style={[styles.tabText, activeTab === 'Profile' && { color: '#D2691E' }]}>
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomTabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingVertical: 10,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  tabItem: {
    alignItems: 'center',
    flex: 1,
  },
  tabText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
});

export default BottomNavigation;
