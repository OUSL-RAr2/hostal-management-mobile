// Quick Action Button Component - Reusable action button for Quick Actions section
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

const QuickActionButton = ({ 
  backgroundColor, 
  iconSource, 
  label, 
  onPress 
}) => {
  return (
    <TouchableOpacity 
      style={[styles.actionBox, { backgroundColor }]}
      onPress={onPress}
    >
      <Image 
        source={iconSource} 
        style={styles.actionImage}
        resizeMode="contain"
      />
      <Text style={styles.actionLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  actionBox: {
    width: '48%',
    aspectRatio: 1.2,
    borderRadius: 15,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionImage: {
    width: 50,
    height: 50,
    marginBottom: 10,
    tintColor: '#FFFFFF',
  },
  actionLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default QuickActionButton;
