// Quick Action Button Component - Reusable action button for Quick Actions section
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const QuickActionButton = ({ 
  backgroundColor, 
  iconSource, 
  iconName,
  iconColor = '#FFFFFF',
  iconSize = 36,
  label, 
  onPress 
}) => {
  return (
    <TouchableOpacity 
      style={[styles.actionBox, { backgroundColor }]}
      onPress={onPress}
    >
      {iconSource ? (
        <Image 
          source={iconSource} 
          style={styles.actionImage}
          resizeMode="contain"
        />
      ) : iconName ? (
        <View style={styles.iconWrapper}>
          <MaterialCommunityIcons
            name={iconName}
            size={iconSize}
            color={iconColor}
          />
        </View>
      ) : null}
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
  iconWrapper: {
    width: 50,
    height: 50,
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionImage: {
    width: 50,
    height: 50,
    marginBottom: 8,
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
