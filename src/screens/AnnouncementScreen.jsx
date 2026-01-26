import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../styles';
import { Header } from '../components/ui';
import BottomNavigation from '../components/dashboardScreen/BottomNavigation';
import AnnouncementCard from '../components/announcementScreen/AnnouncementCard';

const AnnouncementScreen = ({ onNavigate }) => {
  const announcements = [
    {
      id: 1,
      title: 'Hostel Maintenance Notice',
      description: 'Water supply will be temporarily unavailable on January 28th from 9 AM to 12 PM for maintenance work.',
      date: '2026-01-25',
      type: 'maintenance',
      priority: 'high',
    },
    {
      id: 4,
      title: 'Welcome New Students',
      description: 'We welcome all new students to OUSL TRF Hostel. Please collect your room keys from the office.',
      date: '2026-01-15',
      type: 'general',
      priority: 'low',
    },
  ];

  const handleAnnouncementPress = (announcement) => {
    console.log('Announcement pressed:', announcement.title);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Announcements" />

      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {announcements.map((announcement) => (
          <AnnouncementCard
            key={announcement.id}
            announcement={announcement}
            onPress={() => handleAnnouncementPress(announcement)}
          />
        ))}

        {/* Bottom padding */}
        <View style={{ height: 20 }} />
      </ScrollView>

      <BottomNavigation activeTab="Home" onNavigate={onNavigate} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    flex: 1,
  },
});

export default AnnouncementScreen;
