import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Ionicons,
  AntDesign,
} from '@expo/vector-icons';
import { Header } from '../components/ui';
import BottomNavigation from '../components/dashboardScreen/BottomNavigation';
import { getStoredUser, removeAuthToken, setStoredUser } from '../services/auth/authService';
import { getDashboardData } from '../services/dashboard/dashboardService';
import { updateUserProfile } from '../services/user/userService';
import { colors } from '../styles';

const AVATAR_PRESETS = [
  { bg: '#FFEDD5', text: '#C25B00' },
  { bg: '#E0F2FE', text: '#0369A1' },
  { bg: '#EDE9FE', text: '#6D28D9' },
  { bg: '#DCFCE7', text: '#166534' },
  { bg: '#FEE2E2', text: '#B91C1C' },
  { bg: '#F3F4F6', text: '#111827' },
];

const Profile = ({ onNavigate }) => {
  const [userData, setUserData] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editVisible, setEditVisible] = useState(false);
  const [avatarModalVisible, setAvatarModalVisible] = useState(false);
  const [saving, setSaving] = useState(false);
  const [avatarSaving, setAvatarSaving] = useState(false);
  const [editForm, setEditForm] = useState({
    contact_number: '',
    emergency_contact: '',
  });

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        setLoading(true);
        setError('');

        const [storedUser, dashboard] = await Promise.all([
          getStoredUser(),
          getDashboardData(),
        ]);

        setUserData(storedUser);
        setDashboardData(dashboard);
      } catch (err) {
        console.error('Failed to load profile data:', err);
        setError(err.message || 'Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    loadProfileData();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return 'N/A';
    return date.toLocaleDateString('en-GB');
  };

  const displayName = userData?.Username || 'Student';
  const studentId = userData?.Registration_Number || userData?.UID || 'N/A';
  const currentRoom = dashboardData?.booking?.roomNumber || 'Not Assigned';
  const checkInDate = formatDate(dashboardData?.booking?.checkInDate);
  const checkOutDate = formatDate(dashboardData?.booking?.checkOutDate);
  const email = userData?.Email || 'N/A';
  const contactNumber = userData?.Contact_Number || 'N/A';
  const faculty = userData?.Faculty || 'N/A';
  const avatarBgColor = userData?.AvatarBgColor || '#FFEDD5';
  const avatarTextColor = userData?.AvatarTextColor || '#C25B00';

  const openEditModal = () => {
    setEditForm({
      contact_number: userData?.Contact_Number || '',
      emergency_contact: userData?.Emergency_Contact || '',
    });
    setEditVisible(true);
  };

  const handleSaveProfile = async () => {
    if (!userData?.UID) {
      Alert.alert('Error', 'Unable to identify current user.');
      return;
    }

    if (!editForm.contact_number.trim() || !editForm.emergency_contact.trim()) {
      Alert.alert('Validation', 'Contact number and emergency contact are required.');
      return;
    }

    try {
      setSaving(true);
      const updatedUser = await updateUserProfile(userData.UID, {
        contact_number: editForm.contact_number.trim(),
        emergency_contact: editForm.emergency_contact.trim(),
      });

      setUserData(updatedUser);
      await setStoredUser(updatedUser);
      setEditVisible(false);
      Alert.alert('Success', 'Profile updated successfully.');
    } catch (err) {
      console.error('Failed to update profile:', err);
      Alert.alert('Update Failed', err.message || 'Unable to update profile.');
    } finally {
      setSaving(false);
    }
  };

  const handleSelectAvatarPreset = async (preset) => {
    try {
      setAvatarSaving(true);
      const updatedUser = {
        ...(userData || {}),
        AvatarBgColor: preset.bg,
        AvatarTextColor: preset.text,
      };

      setUserData(updatedUser);
      await setStoredUser(updatedUser);
      setAvatarModalVisible(false);
    } catch (err) {
      console.error('Failed to update avatar preset:', err);
      Alert.alert('Update Failed', 'Unable to update avatar style.');
    } finally {
      setAvatarSaving(false);
    }
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

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Header title="Profile" onNavigate={onNavigate} />
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.centerText}>Loading profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Header title="Profile" onNavigate={onNavigate} />
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
        <BottomNavigation activeTab="Profile" onNavigate={onNavigate} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Profile" onNavigate={onNavigate} />

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.profileCard}>
          <TouchableOpacity
            style={[styles.avatarPlaceholder, { backgroundColor: avatarBgColor }]}
            onPress={() => setAvatarModalVisible(true)}
            activeOpacity={0.8}
          >
            <Text style={[styles.avatarInitial, { color: avatarTextColor }]}>{String(displayName).charAt(0).toUpperCase()}</Text>
          </TouchableOpacity>
          <Text style={styles.avatarHint}>Tap avatar to customize</Text>
          <Text style={styles.studentName}>{displayName}</Text>
          <Text style={styles.studentId}>Reg Number: {studentId}</Text>

          <View style={styles.detailsRow}>
            <Text style={styles.detailLabel}>Current Room</Text>
            <Text style={styles.detailValue}>{currentRoom}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.detailLabel}>Check-in Date</Text>
            <Text style={styles.detailValue}>{checkInDate}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.detailLabel}>Check-out Date</Text>
            <Text style={styles.detailValue}>{checkOutDate}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.detailLabel}>Email</Text>
            <Text style={styles.detailValue}>{email}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.detailLabel}>Contact</Text>
            <Text style={styles.detailValue}>{contactNumber}</Text>
          </View>
          <View style={[styles.detailsRow, styles.detailsRowLast]}>
            <Text style={styles.detailLabel}>Faculty</Text>
            <Text style={styles.detailValue}>{faculty}</Text>
          </View>
        </View>

        <View style={styles.optionsContainer}>
          <OptionItem iconName="create-outline" text="Edit Profile" onPress={openEditModal} />
          <OptionItem iconName="notifications-outline" text="Notifications" onPress={() => onNavigate('announcements')} />
          <OptionItem iconName="star-outline" text="Rate Your Stay" onPress={() => Alert.alert('Thanks!', 'We appreciate your feedback.')} />
          <OptionItem
            iconName="log-out-outline"
            text="Logout"
            onPress={async () => {
              await removeAuthToken();
              onNavigate('start');
            }}
          />
        </View>
      </ScrollView>

      <Modal
        visible={editVisible}
        transparent
        animationType="fade"
        onRequestClose={() => !saving && setEditVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Edit Profile</Text>

            <Text style={styles.modalFieldTitle}>Contact Number</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Contact Number"
              keyboardType="phone-pad"
              value={editForm.contact_number}
              onChangeText={(value) => setEditForm((prev) => ({ ...prev, contact_number: value }))}
              editable={!saving}
            />

            <Text style={styles.modalFieldTitle}>Emergency Contact</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Emergency Contact"
              keyboardType="phone-pad"
              value={editForm.emergency_contact}
              onChangeText={(value) => setEditForm((prev) => ({ ...prev, emergency_contact: value }))}
              editable={!saving}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setEditVisible(false)}
                disabled={saving}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSaveProfile}
                disabled={saving}
              >
                <Text style={styles.saveButtonText}>{saving ? 'Saving...' : 'Save'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={avatarModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => !avatarSaving && setAvatarModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Choose Avatar Style</Text>
            <View style={styles.avatarPresetGrid}>
              {AVATAR_PRESETS.map((preset, index) => (
                <TouchableOpacity
                  key={`preset-${index}`}
                  style={[styles.avatarPresetItem, { backgroundColor: preset.bg }]}
                  onPress={() => handleSelectAvatarPreset(preset)}
                  disabled={avatarSaving}
                >
                  <Text style={[styles.avatarPresetText, { color: preset.text }]}>
                    {String(displayName).charAt(0).toUpperCase()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setAvatarModalVisible(false)}
                disabled={avatarSaving}
              >
                <Text style={styles.cancelButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

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
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 20,
  },
  centerText: {
    fontSize: 14,
    color: '#666',
  },
  errorText: {
    fontSize: 14,
    color: '#D32F2F',
    textAlign: 'center',
  },
  scrollViewContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 100,
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    marginBottom: 16,
  },
  avatarPlaceholder: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: '#FFEDD5',
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    fontSize: 28,
    fontWeight: '700',
  },
  avatarHint: {
    fontSize: 12,
    color: '#777',
    marginBottom: 6,
  },
  studentName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  studentId: {
    fontSize: 14,
    color: '#777',
    marginBottom: 14,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  detailsRowLast: {
    borderBottomWidth: 0,
    paddingBottom: 2,
  },
  detailLabel: {
    fontSize: 14,
    color: '#555',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
    maxWidth: '55%',
    textAlign: 'right',
  },
  optionsContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
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
  modalFieldTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 9,
    marginBottom: 10,
    color: '#111827',
    fontSize: 14,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 4,
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
    fontSize: 14,
  },
  saveButton: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 9,
    backgroundColor: colors.primary,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  avatarPresetGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 8,
  },
  avatarPresetItem: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarPresetText: {
    fontSize: 20,
    fontWeight: '700',
  },
});

export default Profile;
