// API Configuration for Hostel Management Mobile App
// Update the IP address to match your backend server's IP address

// Get your local IP address by checking the Expo dev server output
// or run 'ipconfig' (Windows) / 'ifconfig' (Mac/Linux) in terminal

export const API_CONFIG = {
  // Replace this IP with your machine's IP address
  // DO NOT use 'localhost' or '127.0.0.1' when testing on a physical device or emulator
  BASE_URL: 'http://192.168.1.6:5000',
  
  // API endpoints
  ENDPOINTS: {
    AUTH: {
      SIGN_IN: '/api/auth/sign-in',
      SIGN_UP: '/api/auth/sign-up',
      SIGN_OUT: '/api/auth/sign-out',
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
