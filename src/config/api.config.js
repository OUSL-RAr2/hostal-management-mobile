// API Configuration for Hostel Management Mobile App
//
// SETUP FOR TEAM MEMBERS:
//   1. Copy .env.example to .env.local in the project root
//   2. Set EXPO_PUBLIC_API_URL=http://<YOUR_LOCAL_IP>:5000
//   3. Find your IP: run 'ipconfig' (Windows) or 'ifconfig' (Mac/Linux)
//   4. .env.local is gitignored — never commit your personal IP
//
// NOTE: Do NOT use 'localhost' or '127.0.0.1' on a physical device/emulator

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

if (!BASE_URL) {
  console.warn(
    '[api.config] EXPO_PUBLIC_API_URL is not set!\n' +
    'Copy .env.example → .env.local and set your local IP.\n' +
    'Example: EXPO_PUBLIC_API_URL=http://192.168.1.x:5000'
  );
}

export const API_CONFIG = {
  BASE_URL: BASE_URL || 'http://localhost:5000',
  
  // API endpoints
  ENDPOINTS: {
    AUTH: {
      SIGN_IN: '/api/auth/sign-in',
      SIGN_UP: '/api/auth/sign-up',
      SIGN_OUT: '/api/auth/sign-out',
    },
    QR: {
      SCAN: '/api/qr/scan',
      MY_LOGS: '/api/qr/my-logs',
      GET_ACTIVE: '/api/qr/active',
    },
    DASHBOARD: {
      GET_DATA: '/api/dashboard/data',
      GET_ROOM_INFO: '/api/dashboard/room-info',
      GET_ACTIVITIES: '/api/dashboard/activities',
      CREATE_COMPLAINT: '/api/dashboard/complaints',
      GET_COMPLAINTS: '/api/dashboard/complaints',
    },
    COMPLAINTS: {
      GET_ALL: '/api/complaints',
      CREATE: '/api/complaints',
      UPDATE: '/api/complaints',
    },
    BOOKINGS: {
      GET_ALL: '/api/bookings',
      CREATE: '/api/bookings',
    },
    ROOMS: {
      GET_ALL: '/api/rooms',
    },
    USERS: {
      GET_PROFILE: '/api/users/profile',
    },
  },
};

// Helper function to build full URL
export const buildUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};
