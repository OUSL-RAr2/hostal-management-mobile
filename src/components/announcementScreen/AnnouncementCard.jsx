import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../styles';

const AnnouncementCard = ({ announcement, onPress }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#FF5252';
      case 'medium':
        return '#FFA726';
      case 'low':
        return '#66BB6A';
      default:
        return '#999';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'maintenance':
        return 'hammer-wrench';
      case 'policy':
        return 'file-document-outline';
      case 'payment':
        return 'currency-usd';
      case 'general':
        return 'bullhorn-outline';
      default:
        return 'information-outline';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.cardHeader}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name={getTypeIcon(announcement.type)}
            size={24}
            color={colors.primary}
          />
        </View>
        <View style={styles.headerContent}>
          <Text style={styles.title}>{announcement.title}</Text>
          <Text style={styles.date}>{formatDate(announcement.date)}</Text>
        </View>
        <View
          style={[
            styles.priorityBadge,
            { backgroundColor: getPriorityColor(announcement.priority) + '20' },
          ]}
        >
          <View
            style={[
              styles.priorityDot,
              { backgroundColor: getPriorityColor(announcement.priority) },
            ]}
          />
        </View>
      </View>

      <Text style={styles.description}>{announcement.description}</Text>

      <View style={styles.footer}>
        <Text style={styles.readMore}>Read more</Text>
        <MaterialCommunityIcons
          name="chevron-right"
          size={20}
          color={colors.primary}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF3E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#999999',
  },
  priorityBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  priorityDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  description: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  readMore: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    marginRight: 4,
  },
});

export default AnnouncementCard;
