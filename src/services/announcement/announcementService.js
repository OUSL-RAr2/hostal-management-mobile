import * as SecureStore from 'expo-secure-store';
import { getUserComplaints } from '../dashboard/dashboardService';

const READ_ANNOUNCEMENT_IDS_KEY = 'read_announcement_ids';

const getStatusLabel = (status) => {
  if (status === 'in_progress') return 'In Progress';
  if (status === 'resolved') return 'Resolved';
  if (status === 'rejected') return 'Rejected';
  return 'New';
};

const getCurrentResponseKey = (complaint) => {
  if (!complaint?.AdminResponse) return null;
  return new Date(complaint.updatedAt || complaint.createdAt).toISOString();
};

const hasReplyForCurrentResponse = (complaint) => {
  const responseKey = getCurrentResponseKey(complaint);
  if (!responseKey || !complaint?.Description) return false;

  return complaint.Description.includes(`[Student Reply|responseKey=${responseKey}|`);
};

const mapComplaintToAnnouncement = (complaint) => {
  const complaintCode = `#${String(complaint.ComplaintID || '').slice(0, 8)}`;

  if (complaint.AdminResponse) {
    const responseKey = getCurrentResponseKey(complaint);
    return {
      id: `${complaint.ComplaintID}:response:${responseKey}`,
      complaintId: complaint.ComplaintID,
      canReply: complaint.Status !== 'resolved' && !hasReplyForCurrentResponse(complaint),
      title: 'New Response to Your Complaint',
      description: `${complaintCode} ${complaint.AdminResponse}`,
      date: responseKey,
      type: 'policy',
      priority: 'high',
    };
  }

  if (complaint.Status && complaint.Status !== 'pending') {
    const statusTimestamp = complaint.updatedAt || complaint.createdAt;
    return {
      id: `${complaint.ComplaintID}:status:${complaint.Status}:${statusTimestamp}`,
      complaintId: complaint.ComplaintID,
      canReply: complaint.Status !== 'resolved' && !!complaint.AdminResponse,
      title: 'Complaint Status Updated',
      description: `${complaintCode} status changed to ${getStatusLabel(complaint.Status)}`,
      date: statusTimestamp,
      type: 'general',
      priority: complaint.Status === 'resolved' ? 'low' : 'medium',
    };
  }

  return {
    id: `${complaint.ComplaintID}:created:${complaint.createdAt}`,
    complaintId: complaint.ComplaintID,
    canReply: false,
    title: 'Complaint Submitted Successfully',
    description: `${complaintCode} ${complaint.Title || 'Your complaint was submitted successfully.'}`,
    date: complaint.createdAt,
    type: 'general',
    priority: 'low',
  };
};

export const fetchComplaintAnnouncements = async () => {
  const complaints = await getUserComplaints();
  const list = Array.isArray(complaints) ? complaints : [];

  return list
    .map(mapComplaintToAnnouncement)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const getReadAnnouncementIds = async () => {
  try {
    const raw = await SecureStore.getItemAsync(READ_ANNOUNCEMENT_IDS_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Failed to read announcement read-state:', error);
    return [];
  }
};

export const markAnnouncementAsRead = async (announcementId) => {
  try {
    const readIds = await getReadAnnouncementIds();
    const idString = String(announcementId);

    if (!readIds.includes(idString)) {
      const updated = [...readIds, idString];
      await SecureStore.setItemAsync(READ_ANNOUNCEMENT_IDS_KEY, JSON.stringify(updated));
    }
  } catch (error) {
    console.error('Failed to mark announcement as read:', error);
  }
};

export const getUnreadAnnouncementCount = async () => {
  const [announcements, readIds] = await Promise.all([
    fetchComplaintAnnouncements(),
    getReadAnnouncementIds(),
  ]);

  const readSet = new Set(readIds.map((id) => String(id)));
  return announcements.filter((item) => !readSet.has(String(item.id))).length;
};
