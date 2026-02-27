import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // ✅ fixed import
import {
  MaterialCommunityIcons,
  Ionicons,
  AntDesign,
} from '@expo/vector-icons';
import { Header } from '../components/ui';
import BottomNavigation from '../components/dashboardScreen/BottomNavigation';

const Profile = ({ onNavigate }) => {
  const studentData = {
    name: 'K.M.T.N. Deshapriya',
    studentId: '223604391',
    currentRoom: 'A-101',
    checkInDate: '07/09/2025',
    checkOutDate: '10/09/2025',
  };

  const OptionItem = ({ iconName, text, onPress }) => (
    <TouchableOpacity style={styles.optionItem} onPress={onPress}>
      <View style={styles.optionLeft}>
        <Ionicons name={iconName} size={24} color="#333" />
        <Text style={styles.optionText}>{text}</Text>
      </View>
      <AntDesign name="right" size={18} color="#999" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Profile" onNavigate={onNavigate} />

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.profileCard}>
          <View style={styles.avatarPlaceholder}>
            {/* Add Image here later */}
          </View>
          <Text style={styles.studentName}>{studentData.name}</Text>
          <Text style={styles.studentId}>Student ID: {studentData.studentId}</Text>

          <View style={styles.detailsRow}>
            <Text style={styles.detailLabel}>Current Room</Text>
            <Text style={styles.detailValue}>{studentData.currentRoom}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.detailLabel}>Check-in Date</Text>
            <Text style={styles.detailValue}>{studentData.checkInDate}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.detailLabel}>Check-out Date</Text>
            <Text style={styles.detailValue}>{studentData.checkOutDate}</Text>
          </View>
        </View>

        <View style={styles.optionsContainer}>
          <OptionItem iconName="notifications-outline" text="Notifications" onPress={() => console.log('Notifications')} />
          <OptionItem iconName="wallet-outline" text="Payment History" onPress={() => console.log('Payment History')} />
          <OptionItem iconName="star-outline" text="Rate Your Stay" onPress={() => console.log('Rate Your Stay')} />
          <OptionItem iconName="log-out-outline" text="Logout" onPress={() => console.log('Logout')} />
        </View>
      </ScrollView>

      {/* Bottom Navigation - Reusable Component */}
      <BottomNavigation activeTab="Profile" onNavigate={onNavigate} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerBackground: {
    backgroundColor: '#D2691E',
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  profileTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
  },
  hostelName: {
    fontSize: 16,
    color: '#eee',
    marginTop: 2,
  },
  notificationBell: {
    padding: 8,
  },
  scrollViewContent: {
    marginTop: 80,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginTop: -40,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    marginBottom: 20,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#D2691E',
    marginBottom: 15,
  },
  studentName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  studentId: {
    fontSize: 16,
    color: '#777',
    marginBottom: 20,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  detailLabel: {
    fontSize: 16,
    color: '#555',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  optionsContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 17,
    color: '#333',
    marginLeft: 15,
  },
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

export default Profile;
