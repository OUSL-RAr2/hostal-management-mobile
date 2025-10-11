// Color Palette Demo - Simple Visual Display

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../styles';

const ColorDemo = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Color Palette</Text>
      </View>

      {/* Primary Colors */}
      <View style={styles.section}>
        <Text style={styles.label}>Primary Colors</Text>
        <View style={styles.colorRow}>
          <View style={[styles.colorBox, { backgroundColor: colors.primary }]}>
            <Text style={styles.colorText}>Primary</Text>
            <Text style={styles.colorCode}>#FF6B35</Text>
          </View>
          <View style={[styles.colorBox, { backgroundColor: colors.primaryLight }]}>
            <Text style={styles.colorText}>Light</Text>
            <Text style={styles.colorCode}>#FF8C5A</Text>
          </View>
          <View style={[styles.colorBox, { backgroundColor: colors.primaryDark }]}>
            <Text style={styles.colorText}>Dark</Text>
            <Text style={styles.colorCode}>#E55A2B</Text>
          </View>
        </View>
      </View>

      {/* Action Colors */}
      <View style={styles.section}>
        <Text style={styles.label}>Action Colors</Text>
        <View style={styles.colorRow}>
          <View style={[styles.colorBox, { backgroundColor: colors.actionBlue }]}>
            <Text style={styles.colorText}>Blue</Text>
            <Text style={styles.colorCode}>#4A90E2</Text>
          </View>
          <View style={[styles.colorBox, { backgroundColor: colors.actionGreen }]}>
            <Text style={styles.colorText}>Green</Text>
            <Text style={styles.colorCode}>#2ECC71</Text>
          </View>
        </View>
        <View style={styles.colorRow}>
          <View style={[styles.colorBox, { backgroundColor: colors.actionPink }]}>
            <Text style={styles.colorText}>Pink</Text>
            <Text style={styles.colorCode}>#E91E63</Text>
          </View>
          <View style={[styles.colorBox, { backgroundColor: colors.actionPurple }]}>
            <Text style={styles.colorText}>Purple</Text>
            <Text style={styles.colorCode}>#9B59B6</Text>
          </View>
        </View>
      </View>

      {/* Status Colors */}
      <View style={styles.section}>
        <Text style={styles.label}>Status Colors</Text>
        <View style={styles.colorRow}>
          <View style={[styles.colorBox, { backgroundColor: colors.success }]}>
            <Text style={styles.colorText}>Success</Text>
            <Text style={styles.colorCode}>#2ECC71</Text>
          </View>
          <View style={[styles.colorBox, { backgroundColor: colors.warning }]}>
            <Text style={styles.colorText}>Warning</Text>
            <Text style={styles.colorCode}>#F39C12</Text>
          </View>
        </View>
        <View style={styles.colorRow}>
          <View style={[styles.colorBox, { backgroundColor: colors.error }]}>
            <Text style={styles.colorText}>Error</Text>
            <Text style={styles.colorCode}>#E74C3C</Text>
          </View>
          <View style={[styles.colorBox, { backgroundColor: colors.info }]}>
            <Text style={styles.colorText}>Info</Text>
            <Text style={styles.colorCode}>#4A90E2</Text>
          </View>
        </View>
      </View>

      {/* Text Colors */}
      <View style={styles.section}>
        <Text style={styles.label}>Text Colors</Text>
        <View style={styles.textBox}>
          <Text style={[styles.sampleText, { color: colors.textPrimary }]}>
            Primary Text (#333333)
          </Text>
          <Text style={[styles.sampleText, { color: colors.textSecondary }]}>
            Secondary Text (#666666)
          </Text>
          <Text style={[styles.sampleText, { color: colors.textLight }]}>
            Light Text (#999999)
          </Text>
        </View>
      </View>

      {/* Background Colors */}
      <View style={styles.section}>
        <Text style={styles.label}>Background Colors</Text>
        <View style={styles.colorRow}>
          <View style={[styles.bgBox, { backgroundColor: colors.background }]}>
            <Text style={styles.bgText}>White</Text>
            <Text style={styles.bgCode}>#FFFFFF</Text>
          </View>
          <View style={[styles.bgBox, { backgroundColor: colors.backgroundLight }]}>
            <Text style={styles.bgText}>Light</Text>
            <Text style={styles.bgCode}>#F5F5F5</Text>
          </View>
        </View>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    backgroundColor: colors.primary,
    padding: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  section: {
    padding: 20,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  colorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  colorBox: {
    flex: 1,
    height: 100,
    borderRadius: 10,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
  },
  colorCode: {
    color: '#FFFFFF',
    fontSize: 11,
    opacity: 0.9,
  },
  textBox: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
  },
  sampleText: {
    fontSize: 16,
    marginBottom: 10,
  },
  bgBox: {
    flex: 1,
    height: 80,
    borderRadius: 10,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  bgText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
  },
  bgCode: {
    color: '#666',
    fontSize: 11,
  },
});

export default ColorDemo;
