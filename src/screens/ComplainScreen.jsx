import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { colors } from '../styles';
import { Header, GradientButton } from '../components/ui';
import BottomNavigation from '../components/dashboardScreen/BottomNavigation';
import { createComplaint, deleteComplaint, getUserComplaints } from '../services/dashboard/dashboardService';

const ComplainScreen = ({ onNavigate }) => {
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [complaints, setComplaints] = useState([]);
  const [loadingComplaints, setLoadingComplaints] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isRealtimeSyncingRef = useRef(false);

  useEffect(() => {
    loadComplaints();

    const intervalId = setInterval(async () => {
      if (isRealtimeSyncingRef.current) return;

      try {
        isRealtimeSyncingRef.current = true;
        await loadComplaints({ silent: true });
      } finally {
        isRealtimeSyncingRef.current = false;
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const loadComplaints = async ({ silent = false } = {}) => {
    try {
      if (!silent) {
        setLoadingComplaints(true);
      }
      const data = await getUserComplaints();
      setComplaints(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to load complaints:', error);
      if (!silent) {
        Alert.alert('Error', error.message || 'Failed to load complaints');
      }
    } finally {
      if (!silent) {
        setLoadingComplaints(false);
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-GB');
  };

  const getStatusDisplay = (status) => {
    if (status === 'in_progress') return 'In Progress';
    if (status === 'resolved') return 'Resolved';
    if (status === 'rejected') return 'Rejected';
    return 'Pending';
  };

  const getStatusBadgeStyle = (status) => {
    if (status === 'resolved') return styles.statusBadgeResolved;
    if (status === 'rejected') return styles.statusBadgeRejected;
    if (status === 'in_progress') return styles.statusBadgeProgress;
    return styles.statusBadgePending;
  };

  const canDeleteComplaint = (status) => status === 'pending' || status === 'resolved';

  const handleDeleteComplaint = (complaintId) => {
    Alert.alert(
      'Delete Complaint',
      'This complaint will be removed permanently. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteComplaint(complaintId);
              await loadComplaints();
              Alert.alert('Deleted', 'Complaint deleted successfully.');
            } catch (error) {
              console.error('Failed to delete complaint:', error);
              Alert.alert('Delete Failed', error.message || 'Unable to delete complaint.');
            }
          }
        }
      ]
    );
  };

  const handleSubmitComplaint = async () => {
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (!category || !trimmedTitle || !trimmedDescription) {
      Alert.alert('Missing Details', 'Please select a category and fill in title and description.');
      return;
    }

    try {
      setIsSubmitting(true);

      await createComplaint({
        category,
        title: trimmedTitle,
        description: isAnonymous
          ? `[Anonymous Request]\n${trimmedDescription}`
          : trimmedDescription,
      });

      setCategory('');
      setTitle('');
      setDescription('');
      setIsAnonymous(false);
      await loadComplaints();

      Alert.alert('Success', 'Complaint submitted successfully.');
    } catch (error) {
      console.error('Failed to submit complaint:', error);
      Alert.alert('Submission Failed', error.message || 'Unable to submit complaint. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with gradient effect */}
      <Header title="Complain" onNavigate={onNavigate} />

      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* New Complaint Card */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Submit New Complaint</Text>
          
          <Text style={styles.label}>Category</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={category}
              onValueChange={(itemValue) => setCategory(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select category" value="" />
              <Picker.Item label="Noise disturbance" value="noise" />
              <Picker.Item label="Maintenance issue" value="maintenance" />
              <Picker.Item label="Cleanliness" value="cleanliness" />
              <Picker.Item label="Security concern" value="security" />
              <Picker.Item label="Other" value="other" />
            </Picker>
          </View>

          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Short complaint title"
            placeholderTextColor="#999"
            value={title}
            onChangeText={setTitle}
            editable={!isSubmitting}
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Describe your complaint in detail..."
            placeholderTextColor="#999"
            multiline
            numberOfLines={6}
            value={description}
            onChangeText={setDescription}
            editable={!isSubmitting}
            textAlignVertical="top"
          />

          <TouchableOpacity 
            style={styles.checkboxContainer}
            onPress={() => setIsAnonymous(!isAnonymous)}
          >
            <View style={[styles.checkbox, isAnonymous && styles.checkboxChecked]}>
              {isAnonymous && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.checkboxLabel}>Submit anonymously</Text>
          </TouchableOpacity>

          <GradientButton 
            title={isSubmitting ? 'Submitting...' : 'Submit Complaint'} 
            onPress={handleSubmitComplaint}
            disabled={isSubmitting}
          />
        </View>

        {/* Previous Complaints */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Previous Complaints</Text>

          {loadingComplaints ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color={colors.primary} />
              <Text style={styles.loadingText}>Loading complaints...</Text>
            </View>
          ) : complaints.length === 0 ? (
            <Text style={styles.emptyText}>No complaints submitted yet.</Text>
          ) : (
            complaints.map((item) => (
              <View style={styles.complaintItem} key={item.ComplaintID}>
                <View style={styles.complaintRow}>
                  <Text style={styles.complaintTitle}>{item.Title}</Text>
                  <View style={[styles.statusBadge, getStatusBadgeStyle(item.Status)]}>
                    <Text style={styles.statusText}>{getStatusDisplay(item.Status)}</Text>
                  </View>
                </View>
                <Text style={styles.complaintDetail}>Category: {item.Category}</Text>
                {item.Room?.RoomNumber && (
                  <Text style={styles.complaintDetail}>Room: {item.Room.RoomNumber}</Text>
                )}
                {item.AdminResponse && (
                  <View style={styles.adminResponseBox}>
                    <Text style={styles.adminResponseLabel}>Admin Response</Text>
                    <Text style={styles.adminResponseText}>{item.AdminResponse}</Text>
                  </View>
                )}
                <Text style={styles.complaintDate}>{formatDate(item.createdAt)}</Text>
                {canDeleteComplaint(item.Status) && (
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDeleteComplaint(item.ComplaintID)}
                  >
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))
          )}
        </View>

        {/* Bottom padding */}
        <View style={{ height: 20 }} />
      </ScrollView>

      <BottomNavigation activeTab="Complain" onNavigate={onNavigate} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    background: 'linear-gradient(135deg, #FF8C42 0%, #FFB84D 100%)',
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FF8C42',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    marginTop: 2,
    opacity: 0.95,
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
    color: '#FFFFFF',
  },
  scrollContent: {
    flex: 1,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
    marginTop: 4,
  },
  pickerContainer: {
    borderWidth: 1.5,
    borderColor: '#CCCCCC',
    borderRadius: 10,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#333333',
    backgroundColor: 'transparent',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#333',
    height: 120,
    backgroundColor: '#FAFAFA',
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#333',
    backgroundColor: '#FAFAFA',
    marginBottom: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#CCCCCC',
    borderRadius: 4,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#FF8C42',
    borderColor: '#FF8C42',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#666666',
  },
  submitButton: {
    backgroundColor: '#FF8C42',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  complaintItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingVertical: 12,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
  },
  loadingText: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  complaintRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  complaintTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBadgePending: {
    backgroundColor: '#FFE5CC',
  },
  statusBadgeProgress: {
    backgroundColor: '#FFF4CC',
  },
  statusBadgeResolved: {
    backgroundColor: '#E7F8EC',
  },
  statusBadgeRejected: {
    backgroundColor: '#FDECEC',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FF8C42',
  },
  complaintDetail: {
    fontSize: 13,
    color: '#666666',
    marginBottom: 2,
  },
  complaintDate: {
    fontSize: 12,
    color: '#999999',
  },
  adminResponseBox: {
    marginTop: 8,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#F7F8FA',
    borderWidth: 1,
    borderColor: '#E4E7EC',
  },
  adminResponseLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#344054',
    marginBottom: 4,
  },
  adminResponseText: {
    fontSize: 13,
    color: '#475467',
    lineHeight: 18,
  },
  deleteButton: {
    alignSelf: 'flex-start',
    marginTop: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#FDECEC',
    borderWidth: 1,
    borderColor: '#F5B5B5',
  },
  deleteButtonText: {
    color: '#C62828',
    fontSize: 13,
    fontWeight: '600',
  },
});

export default ComplainScreen;
