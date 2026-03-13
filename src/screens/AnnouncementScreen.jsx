import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, ActivityIndicator, Modal, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../styles';
import { Header } from '../components/ui';
import BottomNavigation from '../components/dashboardScreen/BottomNavigation';
import AnnouncementCard from '../components/announcementScreen/AnnouncementCard';
import { replyToComplaint } from '../services/dashboard/dashboardService';
import {
  fetchComplaintAnnouncements,
  getReadAnnouncementIds,
  markAnnouncementAsRead,
} from '../services/announcement/announcementService';

const AnnouncementScreen = ({ onNavigate }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [readIds, setReadIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyModalVisible, setReplyModalVisible] = useState(false);
  const [selectedComplaintId, setSelectedComplaintId] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [isReplySubmitting, setIsReplySubmitting] = useState(false);
  const isRefreshingRef = useRef(false);

  useEffect(() => {
    loadAnnouncements();

    const intervalId = setInterval(async () => {
      if (isRefreshingRef.current) return;

      try {
        isRefreshingRef.current = true;
        await loadAnnouncements({ silent: true });
      } finally {
        isRefreshingRef.current = false;
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const loadAnnouncements = async ({ silent = false } = {}) => {
    try {
      if (!silent) setLoading(true);

      const [announcementData, storedReadIds] = await Promise.all([
        fetchComplaintAnnouncements(),
        getReadAnnouncementIds(),
      ]);

      setAnnouncements(announcementData);
      setReadIds(storedReadIds.map((id) => String(id)));
    } catch (error) {
      console.error('Failed to load announcements:', error);
    } finally {
      if (!silent) setLoading(false);
    }
  };

  const handleMarkAsRead = async (announcement) => {
    const idString = String(announcement.id);

    await markAnnouncementAsRead(announcement.id);
    setReadIds((prev) => (prev.includes(idString) ? prev : [...prev, idString]));
  };

  const openReplyModal = (announcement) => {
    if (!announcement.complaintId) return;
    setSelectedComplaintId(announcement.complaintId);
    setReplyMessage('');
    setReplyModalVisible(true);
  };

  const closeReplyModal = () => {
    if (isReplySubmitting) return;
    setReplyModalVisible(false);
    setSelectedComplaintId(null);
    setReplyMessage('');
  };

  const handleSendReply = async () => {
    const message = replyMessage.trim();
    if (!message) {
      Alert.alert('Missing Message', 'Please enter your reply.');
      return;
    }

    try {
      setIsReplySubmitting(true);
      await replyToComplaint(selectedComplaintId, message);
      closeReplyModal();
      await loadAnnouncements({ silent: true });
      Alert.alert('Success', 'Reply sent successfully.');
    } catch (error) {
      console.error('Failed to send reply:', error);
      Alert.alert('Reply Failed', error.message || 'Unable to send reply.');
    } finally {
      setIsReplySubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Announcements" onNavigate={onNavigate} />

      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {loading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="small" color={colors.primary} />
            <Text style={styles.infoText}>Loading announcements...</Text>
          </View>
        ) : announcements.length === 0 ? (
          <View style={styles.centerContainer}>
            <Text style={styles.infoText}>No complaint announcements yet.</Text>
          </View>
        ) : (
          announcements.map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              announcement={announcement}
              isRead={readIds.includes(String(announcement.id))}
              onMarkAsRead={() => handleMarkAsRead(announcement)}
              onReply={() => openReplyModal(announcement)}
            />
          ))
        )}

        {/* Bottom padding */}
        <View style={{ height: 20 }} />
      </ScrollView>

      <BottomNavigation activeTab="Home" onNavigate={onNavigate} />

      <Modal
        visible={replyModalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeReplyModal}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Reply to Admin/Warden</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Type your reply..."
              placeholderTextColor="#999"
              value={replyMessage}
              onChangeText={setReplyMessage}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              editable={!isReplySubmitting}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.cancelButton} onPress={closeReplyModal} disabled={isReplySubmitting}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sendButton} onPress={handleSendReply} disabled={isReplySubmitting}>
                <Text style={styles.sendButtonText}>{isReplySubmitting ? 'Sending...' : 'Send Reply'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  centerContainer: {
    paddingHorizontal: 16,
    paddingTop: 24,
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    padding: 20,
  },
  modalCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    padding: 10,
    minHeight: 90,
    color: '#111827',
    marginBottom: 12,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  cancelButton: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 9,
    backgroundColor: '#F3F4F6',
  },
  cancelButtonText: {
    color: '#374151',
    fontWeight: '600',
  },
  sendButton: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 9,
    backgroundColor: colors.primary,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
});

export default AnnouncementScreen;
