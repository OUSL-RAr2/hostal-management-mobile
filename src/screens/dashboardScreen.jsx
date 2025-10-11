// Dashboard Screen - OUSL StaySmart Hostel Management
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native';
import { colors } from '../styles';
import BottomNavigation from '../components/dashboardScreen/BottomNavigation';

const DashboardScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header - Fixed at top */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Dashboard</Text>
          <Text style={styles.headerSubtitle}>OUSL TRF Hostel</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Text style={styles.notificationIcon}>🔔</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContent} contentContainerStyle={styles.scrollContainer}>
      {/* Current Status Card */}
      <View style={styles.statusCard}>
        <View style={styles.statusHeader}>
          <View>
            <Text style={styles.statusLabel}>Current Status</Text>
            <Text style={styles.statusValue}>Checked In</Text>
          </View>
          <View style={styles.roomNumberContainer}>
            <Text style={styles.roomNumberLabel}>Room Number</Text>
            <Text style={styles.roomNumber}>F-24</Text>
          </View>
        </View>
        
        <View style={styles.statusDates}>
          <View style={styles.dateBox}>
            <Text style={styles.dateLabel}>Check-in :07/09/2025</Text>
          </View>
          <View style={styles.dateBox}>
            <Text style={styles.dateLabel}>Check-out :10/09/2025</Text>
          </View>
        </View>
      </View>

      {/* Quick Action Section */}
      <View style={styles.quickActionCard}>
        <Text style={styles.sectionTitle}>Quick Action</Text>
        <View style={styles.actionGrid}>
          <TouchableOpacity style={[styles.actionBox, { backgroundColor: colors.actionBlue }]}>
            <Image 
              source={require('../../assets/icon/qr-code.png')} 
              style={styles.actionImage}
              resizeMode="contain"
            />
            <Text style={styles.actionLabel}>Scan QR Code</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBox, { backgroundColor: colors.actionGreen }]}>
            <Image 
              source={require('../../assets/icon/complaint.png')} 
              style={styles.actionImage}
              resizeMode="contain"
            />
            <Text style={styles.actionLabel}>New Complaint</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBox, { backgroundColor: colors.actionPink }]}>
            <Image 
              source={require('../../assets/icon/qr-code.png')} 
              style={styles.actionImage}
              resizeMode="contain"
            />
            <Text style={styles.actionLabel}>Announcements</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBox, { backgroundColor: colors.actionPurple }]}>
            <Image 
              source={require('../../assets/icon/qr-code.png')} 
              style={styles.actionImage}
              resizeMode="contain"
            />
            <Text style={styles.actionLabel}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Room Information Card */}
      <View style={styles.roomInfoCard}>
        <Text style={styles.sectionTitle}>Room Information</Text>
        
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={styles.infoIcon}>📍</Text>
            <Text style={styles.infoLabel}>Room Location</Text>
          </View>
          <Text style={styles.infoValue}>Floor 1</Text>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={styles.infoIcon}>👥</Text>
            <Text style={styles.infoLabel}>Roommates</Text>
          </View>
          <Text style={styles.infoValue}>3/4 Occupied</Text>
        </View>

        <TouchableOpacity style={styles.detailsButton}>
          <Text style={styles.detailsButtonText}>View Roommate Details</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Activity Section */}
      <View style={styles.recentActivityCard}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        
        <View style={styles.activityItem}>
          <View style={[styles.activityIcon, { backgroundColor: '#E8F5E9' }]}>
            <Text style={styles.activityIconText}>✓</Text>
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>Successfully checked in</Text>
            <Text style={styles.activityTime}>Today at 2:30 PM</Text>
          </View>
        </View>

        <View style={styles.activityItem}>
          <View style={[styles.activityIcon, { backgroundColor: '#E3F2FD' }]}>
            <Text style={styles.activityIconText}>📋</Text>
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>Room assignment confirmed</Text>
            <Text style={styles.activityTime}>Today at 10:15 AM</Text>
          </View>
        </View>
      </View>

      {/* Bottom padding for scrolling above nav */}
      <View style={{ height: 80 }} />
      </ScrollView>

      {/* Bottom Navigation - Reusable Component */}
      <BottomNavigation activeTab="Home" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  scrollContent: {
    flex: 1,
  },
  scrollContainer: {
    paddingTop: 10,
    paddingBottom: 20,
  },
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
  },
  notificationIcon: {
    fontSize: 20,
  },
  statusCard: {
    backgroundColor: colors.background,
    margin: 20,
    marginTop: 10,
    padding: 20,
    borderRadius: 20,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 5,
  },
  statusValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.success,
  },
  roomNumberContainer: {
    alignItems: 'flex-end',
  },
  roomNumberLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 5,
  },
  roomNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  statusDates: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateBox: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
    padding: 12,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  dateLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  quickActionCard: {
    backgroundColor: colors.background,
    margin: 20,
    marginTop: 0,
    padding: 20,
    borderRadius: 20,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 15,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
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
    tintColor: colors.textWhite,
  },
  actionIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  actionLabel: {
    color: colors.textWhite,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  actionContent: {
    // Placeholder for action icons/content
  },
  roomInfoCard: {
    backgroundColor: colors.background,
    margin: 20,
    marginTop: 0,
    padding: 20,
    borderRadius: 20,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  infoLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  detailsButton: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  detailsButtonText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  recentActivityCard: {
    backgroundColor: colors.background,
    margin: 20,
    marginTop: 0,
    padding: 20,
    borderRadius: 20,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 12,
    backgroundColor: colors.backgroundLight,
    borderRadius: 12,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityIconText: {
    fontSize: 18,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 3,
  },
  activityTime: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});

export default DashboardScreen;
