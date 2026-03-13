import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles';
import { getUnreadAnnouncementCount } from '../../services/announcement/announcementService';

const Header = ({ title, subtitle = 'OUSL TRF Hostel', onNotificationPress, onNavigate, backgroundColor }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const isCountingRef = useRef(false);

  useEffect(() => {
    const loadUnreadCount = async () => {
      try {
        const count = await getUnreadAnnouncementCount();
        setUnreadCount(count);
      } catch (error) {
        console.error('Failed to load unread announcement count:', error);
      }
    };

    loadUnreadCount();

    const intervalId = setInterval(async () => {
      if (isCountingRef.current) return;

      try {
        isCountingRef.current = true;
        await loadUnreadCount();
      } finally {
        isCountingRef.current = false;
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const handleNotificationPress = () => {
    if (onNotificationPress) {
      onNotificationPress();
    } else if (onNavigate) {
      onNavigate('announcements');
    } else {
      console.log('Notification pressed');
    }
  };

  return (
    <View style={[styles.header, backgroundColor && { backgroundColor }]}>
      <View>
        <Text style={styles.headerTitle}>{title}</Text>
        <Text style={styles.headerSubtitle}>{subtitle}</Text>
      </View>
      <TouchableOpacity 
        style={styles.notificationButton} 
        onPress={handleNotificationPress}
      >
        <Ionicons name="notifications-outline" size={28} color="#fff" />
        {unreadCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{unreadCount > 99 ? '99+' : unreadCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
    padding: 8,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -6,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    paddingHorizontal: 4,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
});

export default Header;
