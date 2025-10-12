// Bottom Navigation Component - Reusable across screens
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../styles';

const BottomNavigation = ({ activeTab = 'Home' }) => {
  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity 
        style={styles.navItem}
        onPress={() => console.log('Home pressed')}
      >
        <Text style={styles.navIcon}>🏠</Text>
        <Text style={[
          styles.navLabel,
          activeTab === 'Home' && styles.navLabelActive
        ]}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.navItem}
        onPress={() => console.log('QR Scan pressed')}
      >
        <Text style={styles.navIcon}>📱</Text>
        <Text style={[
          styles.navLabel,
          activeTab === 'QR Scan' && styles.navLabelActive
        ]}>QR Scan</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.navItem}
        onPress={() => console.log('Complain pressed')}
      >
        <Text style={styles.navIcon}>📋</Text>
        <Text style={[
          styles.navLabel,
          activeTab === 'Complain' && styles.navLabelActive
        ]}>Complain</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.navItem}
        onPress={() => console.log('Profile pressed')}
      >
        <Text style={styles.navIcon}>👤</Text>
        <Text style={[
          styles.navLabel,
          activeTab === 'Profile' && styles.navLabelActive
        ]}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: colors.background,
    paddingVertical: 15,
    paddingHorizontal: 20,
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  navLabel: {
    fontSize: 10,
    color: colors.textSecondary,
  },
  navLabelActive: {
    color: colors.primary,
    fontWeight: '600',
  },
});

export default BottomNavigation;
