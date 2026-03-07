// Dashboard Screen - OUSL StaySmart Hostel Management
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../styles';
import { Header } from '../components/ui';
import BottomNavigation from '../components/dashboardScreen/BottomNavigation';
import ActivityItem from '../components/dashboardScreen/ActivityItem';
import QuickActionButton from '../components/dashboardScreen/QuickActionButton';
import { getDashboardData } from '../services/dashboard/dashboardService';

const DashboardScreen = ({ onNavigate }) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      setError(null);
      const data = await getDashboardData();
      setDashboardData(data);
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
      setError(err.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Pull to refresh handler
  const onRefresh = () => {
    setRefreshing(true);
    fetchDashboardData();
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  };

  // Loading state
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Dashboard" onNavigate={onNavigate} />
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading dashboard...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Error state
  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Dashboard" onNavigate={onNavigate} />
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchDashboardData}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header - Fixed at top */}
      <Header title="Dashboard" onNavigate={onNavigate} />

      <ScrollView 
        style={styles.scrollContent} 
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.primary]} />
        }
      >
        {/* Current Status Card */}
        <View style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <View>
              <Text style={styles.statusLabel}>Booking Status</Text>
              <Text style={[
                styles.statusValue,
                { color: dashboardData?.booking ? colors.success : colors.textSecondary }
              ]}>
                {dashboardData?.status || 'No Active Booking'}
              </Text>
            </View>
            {dashboardData?.booking && (
              <View style={styles.roomNumberContainer}>
                <Text style={styles.roomNumberLabel}>Room Number</Text>
                <Text style={styles.roomNumber}>{dashboardData.booking.roomNumber}</Text>
              </View>
            )}
          </View>

          {/* Physical Check-In/Out Status */}
          <View style={styles.physicalStatusContainer}>
            <View style={styles.physicalStatusRow}>
              <View 
                style={[
                  styles.physicalStatusIndicator,
                  dashboardData?.physicalStatus === 'Checked In' && styles.physicalStatusIndicatorActive
                ]} 
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.physicalStatusLabel}>Physical Status</Text>
                <Text style={[
                  styles.physicalStatusText,
                  { color: dashboardData?.physicalStatus === 'Checked In' ? colors.success : colors.textSecondary }
                ]}>
                  {dashboardData?.physicalStatus || 'Not Checked In'}
                </Text>
                {dashboardData?.lastLocation && (
                  <Text style={styles.physicalStatusLocation}>
                    {dashboardData.lastLocation}
                    {dashboardData?.lastCheckInOut && ` • ${new Date(dashboardData.lastCheckInOut).toLocaleString()}`}
                  </Text>
                )}
              </View>
            </View>
          </View>
          
          {dashboardData?.booking && (
            <View style={styles.statusDates}>
              <View style={styles.dateBox}>
                <Text style={styles.dateLabel}>
                  Check-in: {formatDate(dashboardData.booking.checkInDate)}
                </Text>
              </View>
              <View style={styles.dateBox}>
                <Text style={styles.dateLabel}>
                  Check-out: {formatDate(dashboardData.booking.checkOutDate)}
                </Text>
              </View>
            </View>
          )}
          
          {!dashboardData?.booking && (
            <Text style={styles.noBookingText}>
              You don't have an active booking at the moment.
            </Text>
          )}
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
            onPress={() => onNavigate && onNavigate('announcements')}
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
      {dashboardData?.booking && (
        <View style={styles.roomInfoCard}>
          <Text style={styles.sectionTitle}>Room Information</Text>
          
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.infoIcon}>📍</Text>
              <Text style={styles.infoLabel}>Room Location</Text>
            </View>
            <Text style={styles.infoValue}>Floor {dashboardData.booking.floorNumber}</Text>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.infoIcon}>👥</Text>
              <Text style={styles.infoLabel}>Roommates</Text>
            </View>
            <Text style={styles.infoValue}>
              {dashboardData.booking.currentOccupancy}/{dashboardData.booking.capacity} Occupied
            </Text>
          </View>

          {dashboardData.roommates && dashboardData.roommates.length > 0 && (
            <TouchableOpacity style={styles.detailsButton}>
              <Text style={styles.detailsButtonText}>
                View Roommate Details ({dashboardData.roommates.length})
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Recent Activity Section */}
      <View style={styles.recentActivityCard}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        
        {dashboardData?.recentActivities && dashboardData.recentActivities.length > 0 ? (
          dashboardData.recentActivities.map((activity, index) => (
            <ActivityItem 
              key={index}
              icon={activity.icon}
              iconBackgroundColor={activity.iconBackgroundColor}
              title={activity.title}
              time={activity.time}
            />
          ))
        ) : (
          <Text style={styles.noActivityText}>No recent activities</Text>
        )}
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
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: colors.textSecondary,
  },
  errorText: {
    fontSize: 16,
    color: colors.error,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  retryButtonText: {
    color: colors.textWhite,
    fontSize: 16,
    fontWeight: '600',
  },
  noBookingText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 10,
    fontStyle: 'italic',
  },
  noActivityText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    padding: 20,
    fontStyle: 'italic',
  },
  physicalStatusContainer: {
    backgroundColor: colors.backgroundLight,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  physicalStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  physicalStatusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#999',
    marginRight: 12,
  },
  physicalStatusIndicatorActive: {
    backgroundColor: colors.success,
  },
  physicalStatusLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  physicalStatusText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  physicalStatusLocation: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 4,
  },
});

export default DashboardScreen;
