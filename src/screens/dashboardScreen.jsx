// Dashboard Screen - OUSL StaySmart Hostel Management
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../styles';
import { Header } from '../components/ui';
import BottomNavigation from '../components/dashboardScreen/BottomNavigation';
import ActivityItem from '../components/dashboardScreen/ActivityItem';
import QuickActionButton from '../components/dashboardScreen/QuickActionButton';

const DashboardScreen = ({ onNavigate }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header - Fixed at top */}
      <Header title="Dashboard" />

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
          <QuickActionButton 
            backgroundColor={colors.actionBlue}
            iconSource={require('../../assets/icon/qr-code.svg')}
            label="Scan QR Code"
            onPress={() => onNavigate && onNavigate('qrscan')}
          />
          <QuickActionButton 
            backgroundColor={colors.actionGreen}
            iconSource={require('../../assets/icon/complaint.svg')}
            label="New Complaint"
            onPress={() => onNavigate && onNavigate('complain')}
          />
          <QuickActionButton 
            backgroundColor={colors.actionPink}
            iconSource={require('../../assets/icon/announcement.svg')}
            label="Announcements"
            onPress={() => console.log('Announcements pressed')}
          />
          <QuickActionButton 
            backgroundColor={colors.actionPurple}
            iconSource={require('../../assets/icon/settings.svg')}
            label="Settings"
            onPress={() => console.log('Settings pressed')}
          />
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
        
        <ActivityItem 
          icon="✓"
          iconBackgroundColor="#E8F5E9"
          title="Successfully checked in"
          time="Today at 2:30 PM"
        />

        <ActivityItem 
          icon="📋"
          iconBackgroundColor="#E3F2FD"
          title="Room assignment confirmed"
          time="Today at 10:15 AM"
        />
      </View>

      {/* Bottom padding for scrolling above nav */}
      <View style={{ height: 80 }} />
      </ScrollView>

      {/* Bottom Navigation - Reusable Component */}
      <BottomNavigation activeTab="Home" onNavigate={onNavigate} />
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
});

export default DashboardScreen;
