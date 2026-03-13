import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../styles';

const AnnouncementCard = ({ announcement, isRead = false, onMarkAsRead, onReply }) => {
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
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return 'N/A';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <View style={[styles.card, !isRead && styles.cardUnread]}>
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
          {!isRead ? (
            <View
              style={[
                styles.priorityDot,
                { backgroundColor: getPriorityColor(announcement.priority) },
              ]}
            />
          ) : (
            <Text style={styles.readText}>Read</Text>
          )}
        </View>
      </View>

      <Text style={styles.description}>{announcement.description}</Text>

      <View style={styles.footer}>
        <View style={styles.footerActions}>
          {announcement.canReply && (
            <TouchableOpacity style={styles.replyButton} onPress={onReply}>
              <Text style={styles.replyButtonText}>Reply</Text>
            </TouchableOpacity>
          )}
          {isRead ? (
            <Text style={styles.readStateText}>Marked as read</Text>
          ) : (
            <TouchableOpacity style={styles.markReadButton} onPress={onMarkAsRead}>
              <Text style={styles.markReadButtonText}>Mark as Read</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
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
  cardUnread: {
    borderWidth: 1,
    borderColor: '#FFD7B5',
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
  readText: {
    fontSize: 10,
    color: '#475467',
    fontWeight: '600',
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
  footerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  markReadButton: {
    backgroundColor: '#FFF3E0',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#FFD7B5',
  },
  replyButton: {
    backgroundColor: '#E8F1FF',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#B7D0FF',
  },
  replyButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2457C5',
  },
  markReadButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
  },
  readStateText: {
    fontSize: 13,
    color: '#667085',
    fontWeight: '600',
  },
});

export default AnnouncementCard;
