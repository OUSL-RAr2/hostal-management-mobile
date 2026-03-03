import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera'; 
import { colors } from '../styles';
import { Header, GradientButton } from '../components/ui';
import BottomNavigation from '../components/dashboardScreen/BottomNavigation';
import { getQrAction } from '../services/qr/qrScanner';

const QrCodeScanScreen = ({ onNavigate }) => {
  const [currentStatus, setCurrentStatus] = useState('Pending Scan...');
  const [activeTab, setActiveTab] = useState('qr');

  // Camera State
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraOpen, setCameraOpen] = useState(false);
  const [scanned, setScanned] = useState(false);

  // Function to request permission and open camera
  const handleOpenScanner = async () => {
    if (!permission?.granted) {
      const { granted } = await requestPermission();
      if (!granted) {
        Alert.alert("Permission Denied", "You need to allow camera access to scan QR codes.");
        return;
      }
    }
    setCameraOpen(true);
    setScanned(false);
  };

  // Function to handle the actual scan
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setCameraOpen(false); // Close camera immediately after scanning

    try {
      // Pass the scanned text to your custom function
      const result = getQrAction(data);

      // Update the UI with the result
      setCurrentStatus(`Checked In - Room ${result.room || 'Unknown'}`);
      Alert.alert("Scan Successful", `Action: ${result.action}\nRoom: ${result.room}`);

    } catch (error) {
      Alert.alert("Invalid QR Code", "This QR code is not recognized by the system.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header title="QR Scan" onNavigate={onNavigate} />

      {/* Main Content - EVERYTHING wraps inside the ScrollView now */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        scrollEnabled={!cameraOpen}
        showsVerticalScrollIndicator={false}
      >
        {/* Card 1: QR Scanner AND Status Combined */}
        <View style={styles.card}>
          <View style={styles.qrScannerBox}>

            {/* Toggle between Camera View and Placeholder */}
            {cameraOpen ? (
              <View style={styles.cameraContainer}>
                <CameraView
                  style={styles.camera}
                  facing="back"
                  isActive={cameraOpen}
                  onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                  barcodeScannerSettings={{
                    barcodeTypes: ["qr"],
                  }}
                />

                <TouchableOpacity
                  style={styles.closeCameraButton}
                  onPress={() => setCameraOpen(false)}
                >
                  <Text style={styles.closeCameraText}>Cancel Scan</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.qrPlaceholder}>
                <MaterialCommunityIcons name="qrcode-scan" size={120} color="#666" />
                <Text style={styles.qrInstruction}>Point camera at QR code</Text>
              </View>
            )}
          </View>

          {!cameraOpen && (
            <GradientButton
              title="Open QR Scanner"
              onPress={handleOpenScanner}
            />
          )}

          {/* Status Section moved inside the first card to match the screenshot */}
          <View style={styles.statusContainer}>
            <Text style={styles.statusLabel}>Current Status</Text>
            <View style={styles.statusRow}>
              <View style={styles.statusIndicator} />
              <Text style={styles.statusText}>{currentStatus}</Text>
            </View>
          </View>
        </View>

        {/* Card 2: Manual Check-in Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Manual Check-in/out</Text>
          <Text style={styles.cardDescription}>
            If QR scanning is not available, you can manually check in/out here.
          </Text>
          <TouchableOpacity style={styles.manualButton}>
            <Text style={styles.manualButtonText}>Manual Check-in/out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab="QR Scan" onNavigate={onNavigate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    flexGrow: 1,
 // Keeps the bottom card from hiding behind the navigation bar
  },
  card: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  qrScannerBox: {
    marginBottom: 20,
  },
  qrPlaceholder: {
    borderWidth: 3,
    borderColor: '#FFD4A8',
    borderStyle: 'dashed',
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 280,
    backgroundColor: '#FFF8F0',
  },
  cameraContainer: {
    height: 300,
    width: '100%',
    backgroundColor: '#000',
    justifyContent: 'center',
    position: 'relative',
  },
  camera: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  closeCameraButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  closeCameraText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  qrInstruction: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 10,
  },
  /* --- Modified Status Styles to center them under the button --- */
  statusContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  statusLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.success,
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.success,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 16,
    lineHeight: 18,
  },
  manualButton: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#F5F5F5',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  manualButtonText: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default QrCodeScanScreen;