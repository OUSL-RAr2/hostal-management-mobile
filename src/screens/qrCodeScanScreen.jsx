
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors } from '../styles';

const QrCodeScanScreen = () => {
  const [currentStatus, setCurrentStatus] = useState('Checked In - Room F-24');
  const [activeTab, setActiveTab] = useState('qr');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>QR Scan</Text>
          <Text style={styles.subtitle}>OUSL TRF Hostel</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Text style={styles.notificationIcon}>🔔</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.content}>
        {/* QR Scanner Card */}
        <View style={styles.card}>
          <View style={styles.qrScannerBox}>
            <View style={styles.qrPlaceholder}>
              <View style={styles.qrGrid}>
                {[...Array(9)].map((_, i) => (
                  <View key={i} style={styles.qrPixel} />
                ))}
              </View>
            </View>
            <Text style={styles.qrInstruction}>Point camera at QR code</Text>
          </View>
          
          <TouchableOpacity style={styles.scanButton}>
            <Text style={styles.scanButtonText}>Open QR Scanner</Text>
          </TouchableOpacity>
        </View>

        {/* Status Card */}
        <View style={styles.card}>
          <Text style={styles.statusLabel}>Current Status</Text>
          <View style={styles.statusRow}>
            <View style={styles.statusIndicator} />
            <Text style={styles.statusText}>{currentStatus}</Text>
          </View>
        </View>

        {/* Manual Check-in Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Manual Check-in/out</Text>
          <Text style={styles.cardDescription}>
            If QR scanning is not available, you can manually check in/out here.
          </Text>
          <TouchableOpacity style={styles.manualButton}>
            <Text style={styles.manualButtonText}>Manual Check-in/out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation - Reusable Component */}
      <BottomNavigation activeTab="QR Scan" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  header: {
    backgroundColor: colors.primary,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    marginTop: 2,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationIcon: {
    fontSize: 20,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  qrScannerBox: {
    marginBottom: 20,
  },
  qrPlaceholder: {
    borderWidth: 3,
    borderColor: colors.textLight,
    borderStyle: 'dashed',
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 280,
  },
  qrGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 90,
    marginBottom: 16,
  },
  qrPixel: {
    width: 26,
    height: 26,
    backgroundColor: colors.textPrimary,
    margin: 2,
    borderRadius: 2,
  },
  qrInstruction: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  scanButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  scanButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  statusLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.success,
    marginRight: 8,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.success,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  manualButton: {
    borderWidth: 2,
    borderColor: colors.textLight,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  manualButtonText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingVertical: 8,
    paddingHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 8,
  },
  navIcon: {
    fontSize: 24,
    marginBottom: 4,
    opacity: 0.6,
  },
  navIconActive: {
    opacity: 1,
  },
  navLabel: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  navLabelActive: {
    color: colors.primary,
    fontWeight: '600',
  },
});

export default QrCodeScanScreen;