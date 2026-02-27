import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { colors } from '../styles';
import { Header, GradientButton } from '../components/ui';
import BottomNavigation from '../components/dashboardScreen/BottomNavigation';

const ComplainScreen = ({ onNavigate }) => {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

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

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Describe your complaint in detail..."
            placeholderTextColor="#999"
            multiline
            numberOfLines={6}
            value={description}
            onChangeText={setDescription}
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
            title="Submit Complaint" 
            onPress={() => console.log('Submit complaint')}
          />
        </View>

        {/* Previous Complaints */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Previous Complaints</Text>
          
          <View style={styles.complaintItem}>
            <View style={styles.complaintRow}>
              <Text style={styles.complaintTitle}>Noise disturbance</Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>In Progress</Text>
              </View>
            </View>
            <Text style={styles.complaintDetail}>Room: F-13</Text>
            <Text style={styles.complaintDate}>08/09/2025</Text>
          </View>
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
    backgroundColor: '#FFE5CC',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
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
});

export default ComplainScreen;
